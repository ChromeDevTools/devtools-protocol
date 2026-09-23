// Regenerates types/*.d.ts using Chromium's protocol_dts_generator.ts.
//
// The generator is maintained in Chromium (the single source of truth) at
// //third_party/blink/public/devtools_protocol/scripts/ and is fetched into
// tmp/chromium/ by the sparse checkout in scripts/update-to-latest.sh.

import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import path from 'node:path';

const scriptsDir = import.meta.dirname;
const repoRoot = path.join(scriptsDir, '..');

const chromiumScriptsDir = process.env.CHROMIUM_PROTOCOL_SCRIPTS_DIR ??
  path.join(repoRoot, 'tmp/chromium/third_party/blink/public/devtools_protocol/scripts');
const generator = path.join(chromiumScriptsDir, 'protocol_dts_generator.ts');

if (!existsSync(generator)) {
  console.error(`
Could not find Chromium's protocol_dts_generator.ts at:
  ${generator}

This generator lives in Chromium, not in this repo. To regenerate the types:

  * run scripts/update-to-latest.sh, which sparse-checks out Chromium into
    tmp/chromium/ and then runs this script, or

  * point at an existing local Chromium checkout:
      CHROMIUM_PROTOCOL_SCRIPTS_DIR=/path/to/src/third_party/blink/public/devtools_protocol/scripts \\
        npm run build-protocol-dts
`);
  process.exit(1);
}

const {status} = spawnSync(
  process.execPath,
  [
    // The generator is type-stripped by Node. It lives outside of scripts/, so
    // the nearest package.json has no "type": "module" and Node would warn.
    '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',
    generator,
    '--output-dir', path.join(repoRoot, 'types'),
    path.join(repoRoot, 'json/js_protocol.json'),
    path.join(repoRoot, 'json/browser_protocol.json'),
  ],
  {stdio: 'inherit'},
);

process.exit(status ?? 1);
