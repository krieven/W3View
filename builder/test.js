'use strict';
const loader=require('./moduleLoader.js');
const reader=require('./filereader.js');

loader(null, 'examples/window.w3v.html', reader, function(data){
	console.dir(data);
});
