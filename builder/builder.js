'use strict';

const W3View = require('../w3view.js');
const jsdom = require('jsdom');

W3View.document = new jsdom.JSDOM('').window.document;

const loader = require('../loader/moduleLoader.js').loadModules;
const converter = require('./converter.js');
const reader = require('../loader/filereader.js');

function builder(src, trgFunc, callback) {
	loader(src, reader, function (src, modules) {
		let buffer = [];
		let imports = {};
		var i = 0;
		for (var path in modules) {
			var converted = converter(modules[path]);
			if (converted) buffer.push(converted);
			else {
				buffer.push(JSON.stringify(modules[path]));
			}
			imports[path] = i;
			i++;
		}

		buffer = ['function ' + (trgFunc || '') +
			'(appContext){var factory=[' + buffer.join(',') + ']'];

		for (var path in modules) {
			var mod = modules[path];
			if (mod.imports) {
				for (var i = 0; i < mod.imports.length; i++) {
					var msrc = reader.makeSrc(src, mod.imports[i].src);
					buffer.push(
						'factory[' + imports[path] +
						'].putModule(\'' + mod.imports[i].name +
						'\',factory[' + imports[msrc] + '], \'' +
						mod.imports[i].type + '\')');
				}
			}
		}
		buffer.push('return factory[' + imports[src] + '];}');
		reader.showSrc && buffer.push('//# sourceURL=W3View.bundle:///' + src + '.js');

		callback(buffer.join(';\n'));
	});
};

module.exports = builder;