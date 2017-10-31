'use strict';
/**
 *
 */
const fs = require('fs'); 
const path = require('path');

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

module.exports = reader;