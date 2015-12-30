/**
 * Created by Oak on 12/30/2015.
 */


//hujiWebServer.start(8080, 'C:\Users\Oak\WebstormProjects\ex3',);
var server = require("./hujiWebServer");
var http = require('http');

server.start(8888, './' ,function(a){
    a?(console.log(a)):(console.log('Server is up, port 8888'));
});
var a=1;
for (var i=0; i<1000; i++) {
	//console.log("attempt "+i);
	http.get("http://127.0.0.1:8888/hujiWebServer.js", function(res) {


	console.log("Got response number " +a + " " + res.statusCode);
	a++;
	//consume response body
	 res.resume();
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
}



