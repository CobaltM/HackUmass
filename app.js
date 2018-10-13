var express = require('express');
var app = express();
var path    = require("path");
var socket = require('socket.io');
var valid;




//room page
app.get('/room/',function(req,res) {
	res.sendFile(path.join(__dirname+'/roomPage.html'));
});
app.use('/room/socketscript.js',function(req,res){
	res.sendFile(path.join(__dirname+'/socketscript.js'));
});
app.use('/room/script.js',function(req,res){
	res.sendFile(path.join(__dirname+'/script.js'));
});
app.use('/room/styleRoomPage.css',function(req,res){
	res.sendFile(path.join(__dirname+'/styleRoomPage.css'));
});
app.use('/room/logo.png',function(req,res){
	res.sendFile(path.join(__dirname+'/logo.png'));
});
//end room page








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
	socket.on('time',function(data){
		io.sockets.emit('time',data);
	});
});
