'use strict';

function convertJs(module) {
	if (!module || !module.raw) return;
	return '{"evaluated":(function(){var module={};' +
		module.raw +
		'\n return module.exports;})()}';
}

module.exports = function (module) {

	if (!module.getRegistry) return convertJs(module);
	const registry = module.getRegistry();

	let buffer = [];

	for (let key in registry) {
		let prep = registry[key].prep;
		let script = prep.script;
		if (script) {
			script = script.toString().trim();
			prep.script = 'hgfFjgjfhg3644%$#*%^86%*%*&%*%@##/' + Math.random() + '/!!!';
		}
		let prepS = JSON.stringify(prep).replace('"' + prep.script + '"', script);
		buffer.push("\"" + key + "\":{\"prep\":" + prepS + "}");
	}

	const registryS = "{" + buffer.join(',\n') + "}";

	buffer = [];

	buffer.push('(function(appContext){');
	buffer.push('return new W3View(appContext)');
	buffer.push('.setRegistry(' + registryS + ');');
	buffer.push('})(appContext)');

	return buffer.join("\n");
};
