'use strict';

let Socket = require('./services/socket.js');
let ContactList = require('./controllers/contact-list.js');


angular
	.module('jstChat', [])
	.service('socket', Socket.withDependencies)
	.controller('contactList', ContactList.withDependencies);
