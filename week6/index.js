const express = require('express')
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const port = process.env.PORT || 3000;





io.on('connection', function(socket){
  console.log("Connected==============")
  socket.on('new-message', function(msg){
    io.emit('new-message', msg);
    console.log("message: "+ msg)
  });
  
socket.on('subscribe', function(room) {
    console.log('joining room', room);
    socket.join(room);
});

socket.on('unsubscribe', function(room) {
    console.log('leaving room', room);
    socket.leave(room);
});

socket.on('message', function(data) {
    console.log('sending room post', data.room, data.message);
    io.emit('message',{message: data.message});

});
  
  
  socket.on('update', function(msg){
    io.emit('update', msg);
    console.log("updates: "+ msg)
  });
});


server.listen(8081 || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = app.address();
  console.log("server listening at", process.env.IP + ":" + 8081);
});