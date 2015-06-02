'use strict';

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let api = {
	register: require('./api/register.js')
};
let errors = {
	userAlreadyExistsError: require('./errors/user-already-exists-error.js')
};


class Server {
	constructor() {
		this._expressServer = express();
	}

	init() {
		this._expressServer.use(bodyParser.urlencoded({
			extended: false
		}));

		this._expressServer
			.get('/', function(req, res) {
				res.sendFile('index.html', {
					root: path.join(__dirname, 'public')
				});
			})
			.post('/api/register', function(req, res) {
				api.register(req.body.username, req.body.password)
					.then(function() {
						res.json({
							success: true
						})
					})
					.catch(function(err) {
						if (err === errors.userAlreadyExistsError) {
							res.json({
								success: false,
								message: err.message
							});
						} else {
							res.json({
								success: false,
								message: 'Internal server error! :('
							});
						}
					});
			});

		this._expressServer.use(express.static(__dirname + '/public', {'index': false}));


		return this;
	}

	start() {
		let port = process.env.PORT ? process.env.PORT : 8080;
		this._expressServer.listen(port);
	}
}

module.exports = new Server();
