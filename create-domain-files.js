'use strict';

/**
 * Utility command that creates HTML file in the _domains folder for each domain found in the _data/protocol.json.
 */

var fs = require('fs');

var protocolText = fs.readFileSync('_data/protocol.json');
var protocol = JSON.parse(protocolText);

(protocol.domains).forEach(function (domain, idx) {
  var name = domain.domain;
  var fileName = '_domains/' + name + '.html';
  var content = "---\n" +
    "layout: default\n" +
    "title: " + name + '\n' +
    "idx: " + idx + '\n' +
    "---";

  fs.writeFileSync(fileName, content);
});
