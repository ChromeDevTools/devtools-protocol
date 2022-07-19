'use script';

const fs = require('fs');
const path = require('path');

const simpleGit = require('simple-git');

const maxCommitsInChangelog = 400;

let results = '';

const wait = (n = 100) => new Promise(res => setTimeout(res, n));

const formatDateString = (dateString) => {
  // `dateString` is of the form `'2022-07-19T04:49:30+00:00'`.
  const date = new Date(dateString);
  const formatted = date.toISOString();
  return formatted;
};

/**
 * Formatter purely taking the diff objects and formatting them to markdown
 */
class Formatter {
  static logCommit(previousCommit, commit, gitdiff) {

    // Don't log commits that don't change the protocol.
    if (!gitdiff || !gitdiff.length) return;

    const gitdiffLines = gitdiff.split('\n');
    const filename = gitdiffLines[0].replace(/.*? b\/pdl\//, '');
    const lineNo = gitdiffLines[4].match(/@@.*?(?<lineno>\d+)/);
    const hunkHeaderContext = gitdiffLines[4].replace(/@@.*@@ /, '');

    const adjustedDiff = [
      `@@ ${filename}:${lineNo.groups.lineno} @@ ${hunkHeaderContext}`,
      ...gitdiffLines.slice(5)
    ].join('\n');

    // simple-git adds this "(HEAD, origin/master)" string to the first commit's message...
    const commitMessage = commit.message.replace(/\(HEAD.*/, '').replace(' (master)', '').replace(' (main)', '').trim();
    const commitDateStr = formatDateString(commit.date);
    results += `\n\n## ${commitMessage} — _${commitDateStr}_\n`;
    const hashCompareStr = `\`${previousCommit.hash.slice(0, 7)}...${commit.hash.slice(0, 7)}\``;
    results += `######  Diff: [${hashCompareStr}](https://github.com/ChromeDevTools/devtools-protocol/compare/${hashCompareStr})\n`;
    results += `
\`\`\`diff
${adjustedDiff.trim()}
\`\`\``;
  }
}


const blacklistedCommits = [
  'b97e97f476c04b6b91e17dbd83ccd4543c3229fd', // use private bot email
  '366374904f0cfd931263af8e171015859c5d6339', // use private bot email
  '88d913066a7a65796e5ecd171508ce0f3514e593', // resolve git conflict
  '0eb828c0d972543692a74149d368ad122bf30cf2', // merge master
  '5c44cf21a81f13f968bc347340c7da7846ce11f6', // messy diff. restored the empty contents
  'f72d9f75a707f841c866931b90b14b60929e9675', // messy diff. restored the empty contents
  'f99d7112f04b237322dd30aceb3f40c8834c9939', // bad commit. emptied things.
  '3e55bd00c7f9fb6490e2dd28b01825300c00ea88', // bad commit. emptied things.
  '874a0ee4cc41a2d73cf4261822ef8604afd5cba9', // bad commit. emptied things.
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

    const max = Math.min(this.commitlogs.length, maxCommitsInChangelog);

    console.log('i'.padEnd(5), 'commit hash'.padEnd(42), 'diff length');
    for (let i = 0; i < max; i++) {
      // Skip the first commits of the repo.
      if (i >= (this.commitlogs.length - 3)) continue;

      // Hack to quit early.
      // if (i < 885) continue;
      // if (i > 6) continue;

      const commit = this.commitlogs[i];
      const previousCommit = this.commitlogs[i + 1];
      if (!previousCommit) continue;

      // If we've walked back to the creation of the .pdl, we done.
      if (commit.hash === '1904d4bb5367c5b24b648641f219d14eaa871c00') return;

      const gitdiff = await this.git.diff([commit.hash, previousCommit.hash, './pdl']);
      // log status
      console.log(i, new Array(4 - i.toString().split('').length).fill(' ').join(''), commit.hash, gitdiff.length.toLocaleString().padStart(8));
      Formatter.logCommit(previousCommit, commit, gitdiff);
    }
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
