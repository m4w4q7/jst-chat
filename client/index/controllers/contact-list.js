'use strict';


class ContactList {

	constructor($scope, socket) {
		this.contacts = [];
		this._$scope = $scope;
		this._socket = socket;

		this._registerSocketListeners();
		this._socket.emit('getContacts');
	};


	_registerSocketListeners() {
		this._socket.on('contacts', (contacts) => {
			this.contacts = contacts;
			this._$scope.$applyAsync();
		});

		this._socket.on('contactAdded', (contactName) => {
			this.contacts.push(contactName);
			this._$scope.$applyAsync();
		});
	};


	addContact(contactName) {
		this._socket.emit('addContact', contactName);
	}


	getMessages(contactName) {
		this._socket.emit('getMessages', contactName);
	}


	static get withDependencies() {
		return _withDependencies;
	}
}


let _withDependencies = ['$scope', 'socket', ContactList];

module.exports = ContactList;
