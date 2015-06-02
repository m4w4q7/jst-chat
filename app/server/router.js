'use strict';

let express = require('express');

let root = require('../routes/root.js');
let api = {
	register: require('../routes/api/register.js'),
	signin: require('../routes/api/signin.js'),
	signout: require('../routes/api/signout.js')
};

let router = express.Router()
	.get('/', root)
	.post('/api/register', api.register)
	.post('/api/signin', api.signin)
	.get('/api/signout', api.signout);


module.exports = router;
