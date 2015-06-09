'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local');

let userRepository = require('../database/users/repository.js');


class Authentication {

	constructor() {
		this._configurePassport();
	}


	getMiddleware() {
		return [
			passport.initialize(),
			passport.session()
		]
	}


	signin(options) {
		return passport.authenticate('local', options);
	}


	signout(request) {
		return request.logout();
	}


	isAuthenticated(request) {
		return request.isAuthenticated();
	}


	getNameOfAuthenticatedUser(request) {
		return request.session.passport.user;
	}


	_configurePassport() {
		passport.use('local', new LocalStrategy(function (username, password, done) {
			userRepository.getUser(username)
				.then(function (user) {
					if (!user) return done(null, false);
					if (password != user.password) return done(null, false);
					return done(null, {
						id: user._id,
						displayName: user.username,
						provider: 'local'
					})
				}).catch(function (err) {
					done(err);
				});
		}));

		passport.serializeUser(function (user, done) {
			done(null, user.displayName);
		});

		passport.deserializeUser(function (username, done) {
			done(null, username);
		});
	}
}

module.exports = new Authentication();
