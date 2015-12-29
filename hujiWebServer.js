//HujiWebServer
//Author: James Adams

var function start(port,rootFolder,callback(err)) {


var serverObj = { };
//using https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
//adding the immutable (read-only) properties. 
Object.defineProperty(serverObj, 'port', {
	value: port
});

Object.defineProperty(serverObj, 'rootFolder', {
	value: rootFolder
});

//if server started
	return serverObj;
//else run callback(err);

};


//export the method so it's publicly accessible upon requiring the module.
exports.start = start;