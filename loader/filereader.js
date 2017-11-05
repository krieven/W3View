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
	nextPart = nextPart || '';
	currentSrc = nextPart ? path.dirname(currentSrc) : currentSrc;
	var src=path.resolve(currentSrc, nextPart);
	return src;
};

if(typeof module !== 'undefined'){
	var fs = require('fs'); 
	var path = require('path');
	module.exports = reader;
}