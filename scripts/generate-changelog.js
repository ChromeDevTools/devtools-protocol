'use script';

const fs = require('fs');
const path = require('path');

const simpleGit = require('simple-git/promise');
const objListDiff = require('obj-list-diff');
const justDiff = require('just-diff').diff;

let results = '';
const wait = (n = 100) => new Promise(res => setTimeout(res, n));

/**
 * Changeset handles diffing the unique shape of the protocol
 */
class Changeset {
  constructor(prev, curr) {
    this.prevDomains = prev.domains;
    this.currentDomains = curr.domains;
    this.diffs = [];
  }

  resolvePath(path,obj){
    path = JSON.parse(JSON.stringify(path));
    let resolvedPath = [];
    while (path.length) {
      const segment = path[0];
      const segmentAsNumber = parseInt(segment, 10);
      if (isFinite(segmentAsNumber)) {
        obj = obj[segmentAsNumber];
        let itemName;
        if (typeof obj === 'string') itemName = obj;
        else itemName = obj[Formatter.getKey(obj)];
        resolvedPath.push(itemName);
      } else {
        obj = obj[segment];
        resolvedPath.push(segment);
      }
      path = path.slice(1);
    }
    return resolvedPath;
  }

  collectChildChanges(prev, current) {
    const itemKey = Formatter.getKey(prev) || Formatter.getKey(current);

    const itemDiff = objListDiff(prev, current, {key: itemKey});

    // get detailed modification changes
    const childChanges = itemDiff.modified.forEach(change => {
        const changeName = change[itemKey];
        const before = prev.find(c => c[itemKey] === changeName)
        const after = current.find(c => c[itemKey] === changeName)
        const jd = justDiff(before, after);

        // resolve the path
        jd.forEach(jdOp => {
          // Don't need to resolve paths for 'add' because we already know the name
          if (jdOp.op === 'add') return;
          jdOp.path = this.resolvePath(jdOp.path, before);
        });

        change.childChanges = jd;
    });
    return itemDiff;
  }
  collectChanges() {
    // Any new/removed domains?
    const domainsDiff = objListDiff(this.prevDomains, this.currentDomains, {key: 'domain'});
    this.diffs.push({itemType: 'domains', domainName: '', diff: domainsDiff});

    // For each domain
    for (const currDomain of this.currentDomains) {
      let prevDomain = this.prevDomains.find(d => d.domain === currDomain.domain);
      if (!prevDomain) {
        prevDomain = {
          commands: [],
          events: [],
          types: []
        };
      }

      //   Any new methods, events, types?
      const commandsDiff = this.collectChildChanges(prevDomain.commands, currDomain.commands);
      this.diffs.push({itemType: 'commands', domainName: currDomain.domain, diff: commandsDiff});

      const eventsDiff = this.collectChildChanges(prevDomain.events, currDomain.events);
      this.diffs.push({itemType: 'events', domainName: currDomain.domain, diff: eventsDiff});

      const typesDiff = this.collectChildChanges(prevDomain.types, currDomain.types);
      this.diffs.push({itemType: 'types', domainName: currDomain.domain, diff: typesDiff});

      // TODO: For each method
      //     Any new parameters?
      // uninmplemented.. we just now only say modified
    }
  }
}

/**
 * Formatter purely taking the diff objects and formatting them to markdown
 */
class Formatter {
  static logCommit(previousCommit, commit, changes) {

    // Don't log commits that don't change the protocol.
    changes.forEach(change => Formatter.cleanDiff(change));
    changes = changes.filter(change => change.diff.added.length || change.diff.removed.length || change.diff.modified.length);
    if (changes.length === 0) return;

    // simple-git adds this "(HEAD, origin/master)" string to the first commit's message...
    const commitMessage = commit.message.replace(/\(HEAD.*/, '').replace(' (master)', '').trim();
    results += `\n\n## ${commitMessage}\n`;
    results += `###### _${commit.date.replace(' -0700', '')}_ `;
    const hashCompareStr = `${previousCommit.hash.slice(0, 7)}...${commit.hash.slice(0, 7)}`;
    results += `| Diff: [${hashCompareStr}](https://github.com/ChromeDevTools/devtools-protocol/compare/${hashCompareStr})\n`;
    changes.forEach(change => Formatter.logDiff(change));
  }

  static cleanDiff({itemType, domainName, diff}) {
    delete diff.unchanged;

    // Note: domainsDiff.modified will include new methods in a domain
    if (itemType === 'domains') diff.modified = [];
  }

  static logDiff({itemType, domainName, diff}) {
    for (const changeType of Object.keys(diff)) {
      const diffDetails = diff[changeType];
      if (diffDetails.length === 0) continue;
      domainName = domainName || diffDetails[0].domain;
      Formatter.outputChanges(domainName, itemType, changeType, diffDetails);
    }
  }

  static outputChanges(domainName, itemType, changeType, diffDetails) {
    if (diffDetails.length === 0) return;

    const displayChangeType = changeType.replace('added', 'new');
    const displayItemType = itemType.replace('commands', 'methods');
    const pluralize = (type, details) => `${type.replace(/s$/, '')}${details.length > 1 ? 's' : ''}`;

    results += `#### \`${domainName}\`: ${displayChangeType} ${pluralize(itemType, diffDetails)}\n`;

    const cleanType = type => type.replace(/s$/, '');

    diffDetails.forEach(change => {
      const itemKey = Formatter.getKey(change);
      const itemValue = change[itemKey];
      const linkHref = `https://chromedevtools.github.io/devtools-protocol/tot/${domainName}/#${cleanType(displayItemType)}-${itemValue}`;
      results += `* [\`${domainName}.${itemValue}\`](${linkHref})`;
      results += Formatter.generateChildChanges(change.childChanges);
      results += '\n';
    });
  }

  static generateChildChanges(childChanges) {
    if (!childChanges || !childChanges.length) return '';
    let textChanges = [];

    const opToText = {
      'remove': 'removed',
      'add': 'added',
      'replace': 'updated',
    };
    const locationToText = location => location === 'returns' ? 'return value' : location;


    childChanges.forEach(change => {
      const path = change.path;
      const paramsReturnsOrProperties = ['parameters', 'returns', 'properties', 'items', 'enum'];

      let eoPath = path[path.length-1];
      let restOfPath = path.slice(0, path.length-1);

      // For Added items, sometimes we need to pull the name from the change
      if (isFinite(parseInt(eoPath, 10))) {
        eoPath = !change.value ? '' : typeof change.value === 'string' ? change.value :
            change.value[Formatter.getKey(change.value)];
      }
      if (isFinite(parseInt(restOfPath[restOfPath.length-1], 10))) {
        restOfPath = restOfPath.slice(0, restOfPath.length - 1);
      }

      if (paramsReturnsOrProperties.includes(path[0])) {
        // Handle changes within parameters and returns
        //     Property `experimental` added in parameters.
        //     The return value's errorText type updated.
        const propName = eoPath;
        if (restOfPath.length === 1) {
          textChanges.push(`The ${locationToText(restOfPath[0])}'s \`${propName}\` _${opToText[change.op]}_`);
        } else if (restOfPath.length > 1) {
          textChanges.push(`The \`${restOfPath[1]}\` in the ${locationToText(restOfPath[0])} had \`${propName}\` _${opToText[change.op]}_`);
        }
      } else if (path.length === 1) {
        // Handle deprecated, redirect, experimental, description
        //     `deprecated` was added.
        textChanges.push(`\`${path[0]}\` ${opToText[change.op]}`);
      } else {
        console.log('WTF', change)
        textChanges.push(`WTF ${path[0]} ${eoPath} ${opToText[change.op]}`);
      }
    });
    if (textChanges.length === 0) return '';

    // deduplicate
    const changesByCount = textChanges.reduce((all, curr) => {
      if (all.has(curr)) return all.set(curr, all.get(curr) + 1);
      else return all.set(curr, 1);
    }, new Map());

    let text = ' - ';
    for (const [textChange, count] of changesByCount) {
      text += textChange + (count > 1 ? ` (${count} times). ` : '. ');
    };

    return text.trimEnd();
  }

  static getKey(obj) {
    if (Array.isArray(obj) && obj.length) return Formatter.getKey(obj[0]);
    if (Array.isArray(obj)) return null;
    if (obj === undefined) return null;
    if (obj.domain) return 'domain';
    if (obj.id) return 'id';
    if (obj.name) return 'name';
    throw new Error('Unknown object ' + JSON.stringify(obj));
  }
}


const blacklistedCommits = [
  'b97e97f476c04b6b91e17dbd83ccd4543c3229fd', // use private bot email
  '366374904f0cfd931263af8e171015859c5d6339', // use private bot email
  '88d913066a7a65796e5ecd171508ce0f3514e593', // resolve git conflict
  '0eb828c0d972543692a74149d368ad122bf30cf2', // merge master

];

/**
 * CommitCrawler handles the git interaction and begins the diffing
 */
class CommitCrawler {
  constructor() {
    this.remote =  path.join(__dirname, '../'); // local clone
    this.path = path.join(__dirname, './stubprotocolrepo');

    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
    this.git = simpleGit(this.path);
  }

  async crawl() {
    const git = this.git;
    if (!fs.existsSync(path.join(this.path, '.git'))) {
      await git.clone(this.remote, this.path);
    }
    await git.reset('hard');
    await git.fetch();
    await wait();
    await git.checkout('origin/HEAD');
    await wait();
    const commitlog = await git.log();
    // Remove any commits we don't want to deal with.
    this.commitlogs = commitlog.all.filter(commit => !blacklistedCommits.includes(commit.hash));

    for (let i = 0; i < this.commitlogs.length; i++) {
      // Skip the first commits of the repo.
      if (i >= (this.commitlogs.length - 3)) continue;

      // Hack to quit early.
      // if (i < 2) continue;
      // if (i > 6) continue;

      const commit = this.commitlogs[i];
      const previousCommit = this.commitlogs[i + 1];
      if (!previousCommit) continue;

      const changes = await this.checkoutAndDiff(commit, previousCommit);
      Formatter.logCommit(previousCommit, commit, changes);
    }
  }

  async checkoutAndDiff(commit, previousCommit) {
    console.log(`Calculate diff of ${commit.hash.slice(0, 7)} to ${previousCommit.hash.slice(0, 7)}.  ${commit.date}`);

    const readJSON = filename => JSON.parse(fs.readFileSync(`${this.path}/json/${filename}`, 'utf-8'));

    await this.git.checkout(commit.hash);

    const JSprotocol = 'js_protocol.json';
    const Browserprotocol = 'browser_protocol.json';

    const currentJSProtocol = readJSON(JSprotocol);
    const currentBrowserProtocol = readJSON(Browserprotocol);

    await this.git.checkout(previousCommit.hash);

    // HACK
    // if (previousCommit.hash !== 'f2537966702cad6e91f04fafecc0fd339c707ad0') return; // audits domain added
    // if (previousCommit.hash !== '1da2f2124d8db26d6d6c7e64724e1f86ab6e138d') return; // queryobj method added to runtime
    // if (previousCommit.hash !== 'adb29482b8f2a850634c0720ab4a9c724d1af732') return; // typeprofile added somewhere.. i think?

    const previousJSProtocol = readJSON(JSprotocol);
    const previousBrowserProtocol = readJSON(Browserprotocol);

    const jsChange = new Changeset(previousJSProtocol, currentJSProtocol);
    const browserChange = new Changeset(previousBrowserProtocol, currentBrowserProtocol);

    jsChange.collectChanges();
    browserChange.collectChanges();

    return jsChange.diffs.concat(browserChange.diffs);
  }
}

(async function() {
  try{
    const crawler = new CommitCrawler();
    await crawler.crawl();
    fs.writeFileSync(path.join(__dirname, '../changelog.md'), results);
    console.log('changelog.md updated');
  } catch (e) {
    console.error('changelog.md update FAILED', e);
  }
})();
