var net = require('websocket').server;
var http = require('http');

var httpServer = http.createServer(function (req, res) {
    
});

httpServer.listen(1337);

var socketServer = new net({
    httpServer: httpServer
});

socketServer.on('request', function (request) {

   var connection = request.accept(null, request.origin);

   connection.on('open', function (data) {
      console.log('connection opened');
   });

   connection.on('message', function (data) {
       var a = data.utf8Data;
        console.log('message', a);
        connection.send(JSON.stringify({message: "Hello"}));
   });

   connection.on('close', function (data) {
        console.log('connection closed');
   });
});


// var server = net.createServer(function(socket) {
//     socket.write('Echo server\r\n');
//     console.log(socket.address().address+":"+socket.address().port)
//     socket.on('open', function (data) {
//         debugger;
//     });
//     socket.on('message', function(data) {
//         console.log('Received Server : ' + data);
//     });
//
//     socket.on('close', function() {
//         console.log('Connection closed');
//     });
//
//     socket.on('error', function(err) {
//         console.log(err)
//     });
// });
//
// server.listen(1337, function () {
//     console.log('server listening on 1337');
// });