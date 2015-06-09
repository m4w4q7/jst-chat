'use strict';

let authentication = require('../../lib/authentication.js');

function signout(request, response) {
	authentication.signout(request);
	response.redirect('/')
}


module.exports = signout;
