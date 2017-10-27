'use strict';

const W3View = require('./w3view.js');
const jsdom = require('node-jsdom');

module.exports = function(src, pathName){
	W3View.document = jsdom.jsdom("<html><body></body></html>");

	const factory = new W3View();
	factory.parse(src);

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
	buffer.push('//# sourceURL=W3View:///'+pathName);
	buffer.push('if(typeof module === "object") {var W3View = require(\'w3view\'); module.exports = w3view;}');

	return buffer.join("\n");
};


