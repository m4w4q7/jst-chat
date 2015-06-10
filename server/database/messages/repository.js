'use strict';

let path = require('path');
let NeDB = require('nedb');
let Message = require('./message.js');


class messageRepository {

	constructor() {
		this._database = new NeDB({
			filename: path.join(__dirname, 'datafile.nedb'),
			autoload: true
		});
	}


	addMessage(message) {
		return new Promise(function(resolve, reject) {
			this._database.insert(
				new Message(message),
				function(err) {
					if (err) reject(err);
					else resolve();
				}
			);
		}.bind(this));
	}


	getMessages(participants) {
		return new Promise((function(resolve, reject) {
			this._database
				.find({ $or: [ { from: participants[0], to: participants[1] },  { from: participants[1], to: participants[0] } ] })
				.sort({ time: 1 })
				.exec(function (err, docs) {
					if (err) return reject(err);
					return resolve(docs);
				});
		}).bind(this));
	}


	_createKey(participants) {
		return participants.slice().sort();
	}
}

module.exports = new messageRepository();
