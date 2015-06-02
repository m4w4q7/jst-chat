'use strict';

let userRepository = require('../database/users/repository.js');
let userAlreadyExistsError = require('../errors/user-already-exists-error.js');


function register(username, password) {
	return userRepository.getUserForName(username)
		.then(function(user) {
			if (user) return Promise.reject(userAlreadyExistsError);

			userRepository.addUser({
				username: username,
				password: password
			});
		});
}

module.exports = register;
