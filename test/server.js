var express = require('express');
var srv = express();
srv.use(express.static(__dirname + '/pub/'));
srv.use('/lib/', express.static(__dirname + '/../'));
srv.use('/', express.static(__dirname + '/../'));
srv.use('/examples/', express.static(__dirname + '/../examples/'));

var port = 3000;
srv.listen(port, function () {
	console.log('listen ' + port);
	console.log(__dirname);
})