'use strict';

class Message {
	constructor(attributes) {
		this.from = attributes.from;
		this.to = attributes.to;
		this.content = attributes.content;
		this.time = new Date();
	}
}

module.exports = Message;
