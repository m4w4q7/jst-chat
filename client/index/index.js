// socket service
var Socket = function($window) {
	'use strict';
	this._socket = $window.io();

	this._socket.on('jstc-error', function(error) {
		console.log('Hooray! An error has arrived!'); console.log(error);
		$window.alert(error);
	}.bind(this));
};

Socket.prototype.emit = function(event, data) {
	this._socket.emit(event, data);
};

Socket.prototype.on = function(event, callback) {
	this._socket.on(event, callback);
};

Socket.withDependecies = function() {
	return ['$window', Socket];
};



// contactList
var ContactList = function($scope, socket) {
	'use strict';
	this.contacts = [];
	this._$scope = $scope;
	this._socket = socket;

	this._registerSocketListeners();
	this._socket.emit('getContacts');
};

ContactList.prototype._registerSocketListeners = function() {
	this._socket.on('contacts', function(contacts) {
		console.log('Hooray! Contacts have arrived!'); console.log(contacts);
		this.contacts = contacts;
		this._$scope.$applyAsync();
	}.bind(this));

	this._socket.on('contactAdded', function(contactName) {
		console.log('Hooray! A contact has been added!'); console.log(contactName);
		this.contacts.push(contactName);
		this._$scope.$applyAsync();
	}.bind(this));
};

ContactList.prototype.addContact = function(contactName) {
	this._socket.emit('addContact', contactName);

};

ContactList.withDependecies = function() {
	return ['$scope', 'socket', ContactList];
};


// app
var jstChat = angular.module('jstChat', []);
jstChat.service('socket', Socket.withDependecies());
jstChat.controller('contactList', ContactList.withDependecies());
