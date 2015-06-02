'use strict';

let userRepository = require('../../database/users/repository.js');


function createResponse(success, message) {
	return {success, message}
}


function register(request, response) {
	let username = request.body && request.body.username;
	if (!username) {
		response.send(createResponse(false, 'Internal server error! :('));
		return;
	}

	userRepository.getUserForName(request.body.username)
		.then(function(user) {
			if (user) {
				response.send(createResponse(false, 'User already exists'));
				return;
			}

			userRepository.addUser({
				username: username,
				password: request.body.password
			});

			response.send(createResponse(true, ''));
		})
		.catch(function() {
			response.send(createResponse(false, 'Internal server error! :('));
		});
}

module.exports = register;
