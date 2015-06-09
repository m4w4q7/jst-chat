var socket = io();

$(function() {
	'use strict';

	socket.on('contacts', function(contacts) {
		$('#contact-list')
			.html(contacts.length? '<li>' + contacts.join('</li><li>') + '</li>' : '');
	});

	socket.on('contactAdded', function(contactName) {
		$('#contact-list')
			.append($('<li>' + contactName + '</li>'));
	});

	socket.on('jstc-error', function(error) {
		alert(error);
	});

	socket.emit('getContacts');

	$('#add-contact-button').on('click', function() {
		socket.emit('addContact', $('#add-contact-input').val());
	});

});
