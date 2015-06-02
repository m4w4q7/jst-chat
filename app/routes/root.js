'use strict';

let path = require('path');

let authentication = require('../lib/authentication.js');

function root(request, response) {
	response.sendFile(authentication.isAuthenticated(request) ? 'index.html' : 'signin.html', {
		root: path.join(__dirname, '/../public')
	});
}

module.exports = root;
