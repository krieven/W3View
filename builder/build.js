'use strict';
/**
 * Usage: node build.js <path/to/src/file> <funcName> > <path/to/dest/file>
 * for example
 * node build.js ../examples/modules/window.w3v.html appBundle > ../examples/built/bundle.js
 */
const builder = require(__dirname+'/builder.js');

let src = process.argv[2];
let trgFunc = process.argv[3];

builder(src, trgFunc, console.log);
