'use strict';

let express = require('express');


class Server {
	constructor() {
		this._expressServer = express();
	}

	init() {
		this._expressServer.use(express.static(__dirname + '/public', {'index': false}));
		this._expressServer.get('/', function(req, res) {
			res.sendFile('index.html', {
				root: './server/public/'
			});
		});
		return this;
	}

	start() {
		let port = process.env.PORT ? process.env.PORT : 8080;
		this._expressServer.listen(port);
	}
}

module.exports = new Server();
