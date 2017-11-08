'use strict';
/**
 *
 */

function reader(src, callback){
	reader.get(src, function(err, resp){
		if(err) {
			console.error(err);
			return;
		}
		callback(resp);
	});
}

reader.makeSrc=function(currentSrc, nextPart){
	nextPart = nextPart || '';
	if(nextPart.substr(0)==='/') return nextPart;
	currentSrc = nextPart ? reader.dirname(currentSrc) : currentSrc;
	var src = reader.normalize(currentSrc + nextPart);
	return src;
};

reader.get = function(src, callback){
	var xhr;
	try {
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			xhr =  new XMLHttpRequest();
		}
	}
	xhr.onreadystatechange=function(){
		if(this.readyState!=4) return;
		if(this.status!=200) return callback(this.status+"\n"+this.responseText, "");
		callback(!1, this.responseText);
	};
	xhr.open('get',src,true);
	xhr.send(null);
};

reader.dirname=function(path){
	var res=path.split('?')[0].split('/');
	var last = res[res.length-1];
	res[res.length-1] = '';
	return res.join('/');
};

reader.normalize=function(path){
	var parts = path.split('/');
	var res = [parts[0]];
	for(var i=1; i<parts.length;i++){
		var part = parts[i];
		if(part == '.' || part === ''){
			continue;
		}
		if(part == '..'){
			parts[i-1]=parts[i]='.';
			res.pop();
			i-=2;
			continue;
		}
		res.push(part);
	}
	return res.join('/');
};

