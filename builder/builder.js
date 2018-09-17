'use strict';

const W3View = require('../w3view.js');
const jsdom = require('jsdom'); 

W3View.document = new jsdom.JSDOM('').window.document;

const loader = require('../loader/moduleLoader.js');
const converter = require('./converter.js');
const reader = require('../loader/filereader.js');

function builder(src, trgFunc, callback){
	loader({}, src, reader, function(){
		let buffer = [];
		let imports = {};
		var i = 0;
		for(var path in loader.imported){
			buffer.push('('+converter(loader.imported[path])+')(appContext)');
			imports[path] = i;
			i++;
		}

		buffer = [ 'function '+(trgFunc || 'w3view')+
			'(appContext){var factory=['+buffer.join(',')+']' ];

		for(var path in loader.imported){
			var factory=loader.imported[path];
			if(factory.imports){
				for(var i=0;i<factory.imports.length;i++){
					var msrc = factory.imports[i].src;
					buffer.push(
						'factory['+imports[path]+
						'].putModule(\''+factory.imports[i].name+
						'\',factory['+imports[msrc]+'])');
				}
			}
		}
		buffer.push('return factory['+imports[reader.makeSrc(src)]+'];}',
								'//# sourceURL=W3View:///'+src
		);
		callback( buffer.join(';\n') );
	});
};

module.exports = builder;