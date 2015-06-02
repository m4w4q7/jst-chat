'use strict';

class User {
	constructor(attributes) {
		this.username = attributes.username;
		this.password = attributes.password;
	}
}

module.exports = User;
