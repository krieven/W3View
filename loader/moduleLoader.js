'use strict';

function moduleLoader(appContext, src, reader, onload){
  moduleLoader.imported = moduleLoader.imported || {};
  src = reader.makeSrc(src);
  reader(src,
    function(response){
      var factory = new W3View(appContext);
      if(reader.showSrc) factory.src = src;
      var result = factory.parse(response);
      if(typeof result == 'string'){
        result = {
          raw: result,
          src: src
        };
      }
      moduleLoader.imported[src]=result;
      var loading = 0;

      if(result.imports){
        for(var i=0; i<result.imports.length; i++){
          var msrc = reader.makeSrc(src, result.imports[i].src);
          if(!moduleLoader.imported[msrc]){
            (function(name,msrc,i){
              moduleLoader(appContext,msrc,reader,
                function(res){
                  loading--;
                  moduleLoader.imported[msrc]=res;
                  result.putModule(name, res, result.imports[i].type);
                  result.imports[i].src=msrc;
                  if(loading===0) onload(result);
              });
            })(result.imports[i].name, msrc, i);
            loading++;
            continue;
          }
          result.putModule(result.imports[i].name, 
            moduleLoader.imported[msrc], result.imports[i].type);
          result.imports[i].src = msrc;
        }
      }
      if(loading===0) onload(result);
    }
  )
};

if(typeof module !=='undefined' && typeof require === 'function'){
  var W3View = require('../w3view.js') || W3View;
  
  module.exports=moduleLoader;
}