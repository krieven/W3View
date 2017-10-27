'use strict';
/**
 * Usage: node build.js <path/to/src/file> > <path/to/dest/file>
 * for example
 * node build.js examples/window.w3v.html > examples/window.js
 */
const fs = require('fs');
const wploader = require('./wploader.js');
const args = process.argv.slice(2);
const src = fs.readFileSync(args[0]);

const result = wploader(src,args[0]);

console.log(result);


