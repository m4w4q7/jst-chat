'use strict';

let path = require('path');
let NeDB = require('nedb');
let User = require('./scheme.js');


class userRepository {

	constructor() {
		this._database = new NeDB({
			filename: path.join(__dirname, 'datafile.nedb'),
			autoload: true
		});

		this._database.ensureIndex({
			fieldName: 'username',
			unique: true
		})
	}


	addUser(attributes) {
		this._database.insert(new User(attributes));
	}


	addContact(username, contactName) {
		this._database.update(
			{ username },
			{ $addToSet: { contacts: contactName } },
			{ multi: false }
		)
	}


	getUser(username) {
		return new Promise((function(resolve, reject) {
			this._database.findOne(
				{ username },
				function (err, doc) {
					if (err) return reject(err);
					return resolve(doc);
				});
		}).bind(this));
	}
}

module.exports = new userRepository();
