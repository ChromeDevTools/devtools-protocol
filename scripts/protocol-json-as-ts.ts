import * as fs from 'fs';
import * as path from 'path';

function writeJsonAsTs(jsonPath: string) {
  const jsonContent = fs.readFileSync(jsonPath, `utf8`);
  const tsContent = (
`// Auto-generated by ${path.basename(__filename)}. Do not edit.
// We write the json file as const protocol: IProtocol = {..json..} so typescript can type validate json file.
// import protocol from '${path.relative(__dirname, jsonPath)}' doesn't work,
// since json imports have wide types and we want strings as const literals, so discriminated unions can be type checked.

import {IProtocol} from '../../types/protocol-json-schema';

const protocol: IProtocol = ${jsonContent};
export default protocol;
`
  );

  const outDirPath = `${__dirname}/json_as_ts`;
  const outFilePath = `${outDirPath}/${path.basename(jsonPath, `.json`)}.ts`;
  if (!fs.existsSync(outDirPath)) fs.mkdirSync(outDirPath);
  console.log(`Writing to ${outFilePath}`)
  fs.writeFileSync(outFilePath, tsContent, `utf8`);
}

/// main ///
writeJsonAsTs(`${__dirname}/../json/browser_protocol.json`);
writeJsonAsTs(`${__dirname}/../json/js_protocol.json`);
