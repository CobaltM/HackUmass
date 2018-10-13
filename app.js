var express = require('express');
var app = express();
var path    = require("path");
var socket = require('socket.io');
var valid;




//room page
app.get('/master/',function(req,res) {
	res.sendFile(path.join(__dirname+'/masterresources/roomPage.html'));
});
app.use('/master/script.js',function(req,res){
	res.sendFile(path.join(__dirname+'/masterresources/script.js'));
});
app.use('/master/styleRoomPage.css',function(req,res){
	res.sendFile(path.join(__dirname+'/masterresources/styleRoomPage.css'));
});
app.use('/master/logo.png',function(req,res){
	res.sendFile(path.join(__dirname+'/masterresources/logo.png'));
});
//end room page

app.get('/room/',function(req,res) {
	res.sendFile(path.join(__dirname+'/rresources/roomPage.html'));
});
app.use('/room/script.js',function(req,res){
	res.sendFile(path.join(__dirname+'/rresources/script.js'));
});








/* Server Configuration Section */ 

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
}); 




var io = socket(server);

io.on('connection',function(socket){
	console.log('test',socket.id);
	socket.on('chat',function(data){
		io.sockets.emit('chat',data);
	});
	socket.on('time',function(pos){
		io.sockets.emit('time',pos);
	});
	socket.on('paus'),function(pau){
		io.sockets.emit('paus',pos);
	});
	socket.on('playlist'),function(list){
		io.sockets.emit('playlist',pos);
	});
});
