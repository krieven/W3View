'use strict';

/**
 * @deprecated - use loadModule
 * @param {*} appContext 
 * @param {*} src 
 * @param {*} reader 
 * @param {*} onload 
 */
function moduleLoader(appContext, src, reader, onload) {
  moduleLoader.imported = moduleLoader.imported || {};
  src = reader.makeSrc(src);
  reader(src,
    function (response) {
      var factory = new W3View(appContext);
      if (reader.showSrc) factory.src = src;
      var result = factory.parse(response);
      if (typeof result == 'string') {
        result = {
          raw: result,
          evaluated: new Function(
            'var module = {};\n' +
            result +
            '\nreturn module.exports;\n' +
            (factory.src ? '//# sourceURL=W3View.JS:///' + factory.src : '')
          )(),
          src: factory.src
        };
      }
      moduleLoader.imported[src] = result;
      var loading = 0;

      if (result.imports) {
        for (var i = 0; i < result.imports.length; i++) {
          var msrc = reader.makeSrc(src, result.imports[i].src);
          if (!moduleLoader.imported[msrc]) {
            (function (name, msrc, i) {
              moduleLoader(appContext, msrc, reader,
                function (res) {
                  loading--;
                  moduleLoader.imported[msrc] = res;
                  result.putModule(name, res, result.imports[i].type);
                  result.imports[i].src = msrc;
                  if (loading === 0) onload(result);
                });
            })(result.imports[i].name, msrc, i);
            moduleLoader.imported[msrc] = moduleLoader.imported[msrc] || true;
            loading++;
            continue;
          }
          result.putModule(result.imports[i].name,
            moduleLoader.imported[msrc], result.imports[i].type);
          result.imports[i].src = msrc;
        }
      }
      if (loading === 0) onload(result);
    }
  )
};

if (typeof module !== 'undefined' && typeof require === 'function') {
  var W3View = require('../w3view.js') || W3View;

  module.exports = moduleLoader;
}