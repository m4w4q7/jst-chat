'use strict';

class User {
	constructor(attributes) {
		this.username = attributes.username;
		this.password = attributes.password;
		this.contacts = [];
	}
}

module.exports = User;
