'use strict';

let path = require('path');

let express = require('express');
let bodyParser = require('body-parser');
let expressSession = require('express-session');

let router = require('./router.js');
let authentication = require('../lib/authentication.js');


class Server {

	constructor() {
		this._expressServer = express();
	}


	init() {
		this._expressServer.use(this._getMiddleware());
		return this;
	}


	start() {
		let port = process.env.PORT ? process.env.PORT : 8080;
		this._expressServer.listen(port);
	}


	_getMiddleware() {
		return [
			bodyParser.urlencoded({ extended: false }),
			expressSession({
				secret: "W9cEe5KRpGWcKgkD", // Don't look at this! :)
				resave: "false",
				saveUninitialized: false
			}),
			authentication.getMiddleware(),
			router,
			express.static(path.join(__dirname + '/../public'), {
				'index': false
			})
		];
	}
}


module.exports = new Server();
