# devtools-protocol

Please [file issues on crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?template=DevTools+issue) if you have concerns or problems with the DevTools Protocol (aka Chrome Remote Debugging Protocol).

Use the [protocol viewer](https://chromedevtools.github.io/devtools-protocol/) for navigating the protocol.

TypeScript definitions for the protocol's types are available in ['types/protocol.d.ts'](https://github.com/ChromeDevTools/devtools-protocol/tree/master/types). Mappings from Commands and events to these types are available in either generated `DomainApi` style in [`types/protocol-proxy-api.d.ts`](https://github.com/ChromeDevTools/devtools-protocol/blob/master/types/protocol-proxy-api.d.ts) or in simple name-to-type-interface style in [`types/protocol-mapping.d.ts`](https://github.com/ChromeDevTools/devtools-protocol/blob/master/types/protocol-mapping.d.ts).

Also, this repo is published as the [`devtools-protocol`](https://www.npmjs.com/package/devtools-protocol) NPM module. 
![npm](https://img.shields.io/npm/v/devtools-protocol.svg?style=flat-square)
