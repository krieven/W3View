'use strict';
/**
 * Usage: node build.js <path/to/src/file> > <path/to/dest/file>
 * for example
 * node build.js ../examples/modules/window.w3v.html > ../examples/built/window.js
 */


const loader = require('../loader/moduleLoader.js');
const converter = require('./converter.js');
const reader = require('../loader/filereader.js');

let src = process.argv[2];

loader(null, src, reader, function(){
	let buffer = [];
	let imports = {};
	var i = 0;
	for(var path in loader.imported){
		buffer.push('('+converter(loader.imported[path])+')(appContext)');
		imports[path] = i;
		i++;
	}

	buffer = [ 'function w3view(appContext){var factory=['+buffer.join(',')+']' ];

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

	console.log(buffer.join(';\n'));
});
