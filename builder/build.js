'use strict';
/**
 * Usage: node build.js <path/to/src/file> > <path/to/dest/file>
 * for example
 * node build.js examples/window.w3v.html > examples/window.js
 */
const fs = require('fs'); 
const Path = require('path');

const builder = require('./w3v-builder.js');

const args = process.argv.slice(2);

const src = fs.readFileSync(args[0]);

builder.loader=function(src){
	let path = Path.normalize(Path.dirname(args[0])+'/'+src);
	console.log(path);
	return fs.readFileSync(path);
};

const result = builder(src);

console.log(result);
