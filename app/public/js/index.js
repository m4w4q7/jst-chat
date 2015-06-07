var socket = io();
socket.on('message', function (message) {
	console.log('Message from server: ' + message);
});
