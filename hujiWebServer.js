//HujiWebServer
//Author: James Adams

var net = require('net');

//CHECK
//var hujinet = require('hujinet');


//array to keep track of sockets
sockets=[];

function start(port,rootFolder,callback) {
	console.log('potato2');
	var serverObj = { };

	//using https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
	//adding the immutable (read-only) properties. 
	Object.defineProperty(serverObj, 'port', {
		value: port
	});

	Object.defineProperty(serverObj, 'rootFolder', {
		value: rootFolder
	});


	//create the server (can this be done with a non-anonymous function?)
	var server = net.createServer(function(socket) {
		console.log('potato1');

		//to prevent memory leak detection
		socket.setMaxListeners(0);

		socket.setTimeout(2500);

		//keep track of this socket
		sockets.push(socket);

		//event handlers
		socket.on('data', function(data) {
			//if we're here, we're receiving data from the user/socket.
			//so, handle the data.

			//send the data to hujinet.
			//TODO: add any extra parameters handleRequest needs.
			console.log(data);
			hujinet.handleRequest(data);
		});

		socket.on('end',function() {
			var i = sockets.indexOf(socket);
			sockets.splice(i,1);
		});
	

		socket.on('timeout',function () {
			socket.end();
			var i = sockets.indexOf(socket);
			sockets.splice(i,1);
		});

		//called when the server destroys/closes the connection.
		socket.on('close', function() {
			var i = sockets.indexOf(socket);
			sockets.splice(i,1);
		});
	});


	//send the server with the serverobj which will be returned.
	//This will allow the server to be closed.
	serverObj.server=server;
	//same as previously, but on a server level:
	server.setMaxListeners(0);

	//add callback functionality. (is default ip address okay? maybe have to add so you can add callback (Default params.))
	server.listen(port);

	//error handling if server receives an error event.
	server.on('error',function(errorObj) {
		//TODO something with the error. callback stuff
		//note, 'close' event will be called directly following this.
		callback(errorObj);
	});

	// TODO: add stop(callback) function to server object before returning.
	serverObj.stop = function (callback) {
		//close all the sockets. Ensures the server hard closes, rather than
		//just stopping to accept new connections, when server.close is called.
		for (var i in sockets) {
			sockets[i].destroy();
		};
		this.server.close(function () {
			console.log('server is closed.')
			callback();
		});
	};
	//return serverObj;
};




//export the method so it's publicly accessible upon requiring the module.
exports.start = start;

start(8000,'potato',function(){});

//from ryan dahl:


// var net  = require('net');


// var server = net.createServer(function(socket) {
// 	socket.write("Hello ");
// 	socket.write("world.");
// 	socket.on('data', function(data) {
// 		console.log(data);
// 	});
// });

// server.listen(8000);
