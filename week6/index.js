const express = require('express')
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const port = process.env.PORT || 3000;



// server.listen(port, () => {
// console.log(`started on port: ${port}`);
// });





server.listen(8081 || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = app.address();
  console.log("server listening at", process.env.IP + ":" + 8081);
});