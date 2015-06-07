'use strict';

let authentication = require('../lib/authentication.js');

function root(request, response) {
	if (authentication.isAuthenticated(request)) {
		response.render('index', {
			username: authentication.getNameOfAuthenticatedUser(request)
		});
	} else {
		response.render('signin');
	}

}

module.exports = root;
