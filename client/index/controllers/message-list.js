'use strict';


class MessageList {

	constructor($scope, socket) {
		this.messages = [];
		this._to = '';
		this._$scope = $scope;
		this._socket = socket;

		this._registerSocketListeners();
	};


	addMessage(content) {
		if (this._to) this._socket.emit('addMessage', {
			to: this._to,
			content: content
		});
	}


	isLoaded() {
		return !!this._to;
	}


	_registerSocketListeners() {
		this._socket.on('messages', (answer) => {
			this._to = answer.contactName;
			this.messages = answer.messages;
			this._$scope.$applyAsync();
		});

		this._socket.on('newMessage', (message) => {
			if (this._to === message.from || this._to === message.to) {
				this.messages.push(message);
				this._$scope.$applyAsync();
			}
		});
	};


	static get withDependencies() {
		return _withDependencies;
	}
}


let _withDependencies = ['$scope', 'socket', MessageList];

module.exports = MessageList;
