'use script';

const fs = require('fs');
const path = require('path');

const simpleGit = require('simple-git/promise');
const objListDiff = require('obj-list-diff');

let results = '';

/**
 * Changeset handles diffing the unique shape of the protocol
 */
class Changeset {
  constructor(prev, curr) {
    this.prevDomains = prev.domains;
    this.currentDomains = curr.domains;
    this.diffs = [];
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
      const commandsDiff = objListDiff(prevDomain.commands, currDomain.commands, {key: 'name'});
      this.diffs.push({itemType: 'commands', domainName: currDomain.domain, diff: commandsDiff});

      const eventsDiff = objListDiff(prevDomain.events, currDomain.events, {key: 'name'});
      this.diffs.push({itemType: 'events', domainName: currDomain.domain, diff: eventsDiff});

      const typesDiff = objListDiff(prevDomain.types, currDomain.types, {key: 'id'});
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
    const commitMessage = commit.message.replace(/\(HEAD.*/, '').replace(' (master)', '');
    results += `\n\n## ${commitMessage}\n`;
    results += `###### _${commit.date.replace(' -0700', '')}_\n`;
    const hashCompareStr = `${previousCommit.hash.slice(0, 7)}...${commit.hash.slice(0, 7)}`;
    results += `Diff: [${hashCompareStr}](https://github.com/ChromeDevTools/devtools-protocol/compare/${hashCompareStr})\n`;
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

    // TODO: log the details of what parameters changed and how
    // Using ```diff ... ``` might work out well..
    diffDetails.forEach(change => {
      const itemKey = Formatter.getKey(change);
      const itemValue = change[itemKey];
      const linkHref = `https://chromedevtools.github.io/devtools-protocol/tot/${domainName}/#${cleanType(displayItemType)}-${itemValue}`;
      results += `* [\`${domainName}.${itemValue}\`](${linkHref})\n`;
    });
  }

  static getKey(obj) {
    if (obj.domain) return 'domain';
    if (obj.id) return 'id';
    if (obj.name) return 'name';
    throw new Error('Unknown object');
  }
}

/**
 * CommitCrawler handles the git interaction and begins the diffing
 */
class CommitCrawler {
  constructor() {
    this.remote =  path.join(__dirname, '../');; // local clone
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
    await git.checkout('origin/master');
    const commitlog = await git.log();
    this.commitlogs = commitlog.all;

    for (let i = 0; i < this.commitlogs.length; i++) {
      // Skip the first commits of the repo.
      if (i >= this.commitlogs.length - 3) continue;

      // Hack to quit early.
      // if (i > 20) continue;

      const commit = this.commitlogs[i];
      const previousCommit = this.commitlogs[i + 1];
      if (!previousCommit) continue;

      const changes = await this.checkoutAndDiff(commit, previousCommit);
      Formatter.logCommit(previousCommit, commit, changes);
    }
  }

  async checkoutAndDiff(commit, previousCommit) {
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
    console.error('changelog.md update FAILED');
  }
})();
