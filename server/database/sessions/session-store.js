'use strict';

let path = require('path');
let NeDB = require('nedb');
let ExpressSessionStore = require('express-session/session/store');


class SessionStore extends ExpressSessionStore {

	constructor() {
		super();
		this._database = new NeDB({
			filename: path.join(__dirname, 'datafile.nedb'),
			autoload: true
		});
		this._database.persistence.setAutocompactionInterval(120000);
	}


	get(sid, callback) {
		this._database.findOne({ _id: sid }, function (error, session) {
			if (error) return callback(error);
			if (!session) return callback(null, null);
			return callback(null, session.data);
		});
	}


	set(sid, sessionData, callback) {
		this._database.update(
			{ _id: sid },
			{ $set: { data: sessionData } },
			{ multi: false, upsert: true },
			function (error) {
				return callback(error);
			}
		);
	}


	destroy(sid, callback) {
		this._database.remove(
			{ _id: sid },
			{ multi: false },
			function (err) {
				return callback(err);
			}
		);
	}
}

module.exports = new SessionStore();
