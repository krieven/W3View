'use strict';
/**
 *
 */
const fs = require('fs'); 
const path = require('path');

function reader(src, callback){
	fs.readFile(src, function(err, dataBuff){
		if(err) {
			console.dir(err);
			return;
		}
		callback(dataBuff.toString());
	});
}

reader.makeSrc=function(currentSrc, nextPart){
	var src=path.resolve(path.dirname(currentSrc), nextPart);
	console.log(src);
	return src;
};

module.exports = reader;