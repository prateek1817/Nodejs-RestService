console.log("listening at 4000");
var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator.js');
var staticFile = responder.staticFile('/public');
var _url;
require('./lib/connection');

http.createServer(function(req, res) {
	req.method = req.method.toUpperCase();
	console.log(req.method +' ' +req.url);

if (req.method !== 'GET') {
	res.writeHead(501, { 'Content-Type': 'plain/text'} );
	res.end(req.url +'is not implemented by ths server');
}

if (req.url === '/employees' ) {
	employeeService.getEmployees(function(error, data){
		if (error) {
			return responder.send500(error, res);
		}
		return responder.sendJson(data, res);
	})
}
else if (_url = /^\/employees\/(\d+)$/i.exec(req.url) ) {
	employeeService.getEmployee(_url[1], function(error, data){
		if (error) {
			return responder.send500(error, res);
		}

		if (!data) {
			return responder.send404(res);
		}

		return responder.sendJson(data, res);
	});
}
else {
	res.writeHead(200);
	res.end('static file may be');
}
}).listen(4000);