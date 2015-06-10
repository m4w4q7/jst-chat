'use strict';

/*
client -> server
- getContacts
- addContact
- getMessages
- addMessage
- disconnect

server -> client
- jstcError
- contacts
- contactAdded
- newMessage
- messages
 */

var socketIO = require('socket.io');

var authentication = require('./authentication.js');
var userRepository = require('../database/users/repository.js');
var messageRepository = require('../database/messages/repository.js');


class Messenger {
	constructor() {
		this._clients = [];

		this._handlers = {

			getContacts(socket, username) {
				userRepository.getUser(username).then(function(user) {
					socket.emit('contacts', user.contacts);
				});
			},


			addContact(socket, username, contactName) {
				userRepository.getUser(contactName).then(function(contact) {
					if (!contact) {
						socket.emit('jstcError', 'The specified user does not exist!');
						return;
					}

					userRepository.getUser(username).then(function(user) {
						if (user.contacts.indexOf(contactName) < 0) {
							userRepository.addContact(username, contactName);
							this._clients[username].sockets.forEach(function(socket) {socket.emit('contactAdded', contactName)});
						} else {
							socket.emit('jstcError', 'The specified user is already on the contact list!');
						}
					}.bind(this)).catch(function(error) { socket.emit('jstcError', 'Internal server error!')});

				}.bind(this)).catch(function(error) { socket.emit('jstcError', 'Internal server error!')});
			},


			getMessages(socket, username, contactName) {
				var participants = [username, contactName];
				messageRepository
					.getMessages([username, contactName])
					.then(function(messages) {
						socket.emit('messages', { contactName, messages });
					})
					.catch(function (error) {
						socket.emit('jstcError', 'Internal server error!');
					});
			},


			// message: {to: string, content: string}
			addMessage(socket, username, message) {
				message.from = username;
				messageRepository
					.addMessage(message)
					.then(function() {
						this._clients[username].sockets.forEach(function(socket) { socket.emit('newMessage', message) });
						if (this._clients[message.to]) this._clients[message.to].sockets.forEach(function(socket) { socket.emit('newMessage', message) });
					}.bind(this))
					.catch(function (error) {
						socket.emit('jstcError', 'Internal server error!');
					});
			},


			disconnect(socket, username) {
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
				if (!this._clients[username]) this._clients[username] = { sockets: [] };
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
