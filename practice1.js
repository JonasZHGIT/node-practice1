var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req, res) {
	var pathname = decodeURI(url.parse(req.url).pathname);
	if(pathname != '/' && pathname != '/favicon.ico') {
		var result = handleTime(pathname);
		res.end(JSON.stringify(result));
	} else {
		var realPath = path.join(__dirname, 'front/index.html');
		res.writeHead(200, {"Content-Type": "text/html"});
		fs.readFile(realPath, function(err, data) {
			if(err) throw err;
			res.write(data.toString());
			res.end();
		});
	}
}).listen(process.env.PORT || 8000);

function handleTime(pathname) {
	var path = pathname.trim().substring(1);
	var date = path.search(/[^0-9]/g) >= 0?new Date(path):new Date(parseFloat(path)*1000);
	if(isNaN(date.getTime())) {
		var unix = null;
		var ntr_date = null;
	} else {
		var year = date.getFullYear();
		var month = toMonth(date.getMonth());
		var day = date.getDate();
		var unix = Math.round(date.getTime()/1000);
		var ntr_date = `${month} ${day}, ${year}`;
	}
	var result = {
		unix: unix,
		natural: ntr_date
	};
	return result;
}

function toMonth(n) {
	switch(n) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		case 11:
			return 'December';
		default:
			return false;
	}
}