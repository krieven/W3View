'use strict';
/**
 *
 */

function reader(src, callback){
	fs.readFile(src, function(err, dataBuff){
		if(err) {
			console.error(err);
			return;
		}
		callback(dataBuff.toString());
	});
}

reader.makeSrc=function(currentSrc, nextPart){
	var src=path.resolve(path.dirname(currentSrc), nextPart);
	return src;
};

if(typeof module !== 'undefined'){
	var fs = require('fs'); 
	var path = require('path');
	module.exports = reader;
}