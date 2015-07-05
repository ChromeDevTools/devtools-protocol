(function (document) {
  'use strict';

  window.addEventListener('WebComponentsReady', function () {
    var viewerApp = document.querySelector('viewer-app');
    viewerApp.setProtocolSchema(protocol);

    /*
     ROUTING
     */

    page('/', function () {
      viewerApp.setDomainByName(null);
    });

    page('/:domain', function (data) {
      viewerApp.setDomainByName(data.params.domain);
    });

    // add #! before urls
    page({
      hashbang: true
    });
  });
})(document);
