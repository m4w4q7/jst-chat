'use strict';


class Socket {

	constructor($window) {
		this._socket = $window.io();
		this._socket.on('jstcError', (error) => { $window.alert(error); });
	};


	emit(event, data) {
		this._socket.emit(event, data);
	};


	on(event, callback) {
		this._socket.on(event, callback);
	};


	static get withDependencies() {
		return _withDependencies;
	}
}


let _withDependencies = ['$window', Socket];

module.exports = Socket;
