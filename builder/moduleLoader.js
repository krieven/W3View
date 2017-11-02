'use strict';

function moduleLoader(appContext, src, reader, onload){
	W3View.document = W3View.document || jsdom("");
  moduleLoader.imported = moduleLoader.imported || {};
  src = reader.makeSrc('', src);
  reader(src,
    function(response){
      var factory = new W3View(appContext);
      factory.parse(response);

      moduleLoader.imported[src]=factory;
      var loading = 0;

      if(factory.imports){
        for(var i=0; i<factory.imports.length; i++){
          var msrc = reader.makeSrc(src, factory.imports[i].src);
          if(!moduleLoader.imported[msrc]){
            (function(name,msrc){
              moduleLoader(appContext,msrc,reader,function(res){
                loading--;
                moduleLoader.imported[msrc]=res;
                factory.putModule(name,res);
                if(loading===0) onload(factory);
              });
            })(factory.imports[i].name, msrc);
            loading++;
            continue;
          }
          factory.putModule(factory.imports[i].name, moduleLoader.imported[msrc]);
          factory.imports[i].src = msrc;
        }
      }
      if(loading===0) onload(factory);
    }
  )
};

if(typeof module !=='undefined'){
  var W3View = require('../w3view.js');
  var jsdom = require('node-jsdom'); jsdom = jsdom.jsdom || jsdom;
  module.exports=moduleLoader;
}