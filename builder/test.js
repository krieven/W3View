'use strict';
const loader=require('./moduleLoader.js');
const reader=require('./filereader.js');

console.time('loader');
loader(null, __dirname+'/../examples/window.w3v.html', reader, function(data){
	console.dir(data.create('grid:win:app').outerHTML);
	console.timeEnd('loader');
});

console.time('loader1');
loader(null, __dirname+'/../examples/grid.w3v.html', reader, function(data){
	console.dir(data.create('grid:win:app').outerHTML);
	console.timeEnd('loader1');
});
