'use strict';

var socketIO = require('socket.io');
var authentication = require('./authentication.js');


class Messenger {
	constructor() {
		this._clients = [];

		this._handlers = {
			message(socket, username, message) {
				console.log(`${username} says: ${message}`);
				socket.emit('message', `${username} says: ${message}`);
			},

			disconnect(socket, username) {
				console.log(`${username} disconnected`);
				if (this._clients[username].sockets.length > 1) {
					this._clients[username].sockets.slice(this._clients[username].sockets.indexOf(socket), 1);
				} else {
					delete this._clients[username];
				}
			}
		}
	}


	init(httpServer, sessionMiddleware) {
		this._socketHandler = socketIO(httpServer);
		this._sessionMiddleware = sessionMiddleware;
		this._socketHandler
			.use(function(socket, next) {
			    this._sessionMiddleware(socket.request, {}, next);
			 }.bind(this))
			.on('connection', function (socket) {
				var username = authentication.getNameOfAuthenticatedUser(socket.request);
				console.log(`${username} connected`);

				if (!this._clients[username]) {
					this._clients[username] = { sockets: [] };
					/*
					authentication.getAuthenticatedUser(socket.request).then(function(user) {
						this._clients[username].user = user;
					}.bind(this));
					*/
				}

				this._clients[username].sockets.push(socket);

				this._registerEventHandlers(socket, username);
			}.bind(this));
		return this;
	}


	_registerEventHandlers(socket, username) {
		for (let event in this._handlers) socket.on(event, this._handlers[event].bind(this, socket, username));
	}
}

module.exports = new Messenger();
