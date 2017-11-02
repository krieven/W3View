'use strict';
const loader=require('./moduleLoader.js');
const reader=require('./filereader.js');

console.time('loader');
loader(null, __dirname+'/../examples/window.w3v.html', reader, function(data){
	console.dir(data.create('grid:grid:win:app').outerHTML);
	console.timeEnd('loader');
});

console.time('loader1');
loader({}, __dirname+'/../examples/grid.w3v.html', reader, function(data){
	console.dir(data.create('grid:win:modalwin').outerHTML);
	console.timeEnd('loader1');
	console.time('loader2');
	(data.create('grid:win:modalwin'));
	console.timeEnd('loader2');
});
