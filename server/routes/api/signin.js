'use strict';

let authentication = require('../../lib/authentication.js');


let signin = authentication.signin({
	successRedirect: '/',
	failureRedirect: '/'
});

module.exports = signin;
