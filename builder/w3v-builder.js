'use strict';

const W3View = require('../w3view.js');
const jsdom = require('node-jsdom');

const builder = function(src){
	W3View.document = jsdom.jsdom("<html/>");

	const factory = new W3View();
	factory.parse(src);

	let modules;
	if(factory.imports && factory.imports.length){
		modules=factory.imports.map((item,i)=>{
			return builder.loader(item.src);
		});
	}

	const registry=factory.getRegistry();

	let buffer=[];

	for(let key in registry){
		let prep = registry[key].prep;
		let script = prep.script;
		if(script){
			script = script.toString();
			prep.script = 'hgfFjgjfhg3644%$#*%^86%*%*&%*%@##/'+Math.random()+'/!!!';
		}
		let prepS = JSON.stringify(prep).replace('"'+prep.script+'"', script);
		buffer.push("\""+key+"\":{\"prep\":"+prepS+"}");
	}

	const registryS = "{"+buffer.join(',\n')+"}";

	buffer=[];

	buffer.push('var w3view = function(appContext){');
	buffer.push('var factory = new W3View(appContext);');
	buffer.push('\tfactory.setRegistry(\n'+registryS+');');
	buffer.push('\treturn factory;};');
	buffer.push('//# sourceURL=W3View:///library');
	buffer.push('if(typeof module === "object") {var W3View = require(\'w3view\'); module.exports = w3view;}');

	return buffer.join("\n");
};

builder.loader=function(path){
	throw new Error('builder.loader is abstract and should be implemented by builder')
}

module.exports = builder;
