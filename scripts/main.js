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

    page('/:domain/:element?', function (data) {
      viewerApp.setDomainByName(data.params.domain);

      if(data.params.element) {
        viewerApp.higlightElement(data.params.element);
      }
    });

    // add #! before urls
    page({
      hashbang: true
    });
  });
})(document);
