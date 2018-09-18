import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import mongo_routes from './routes/mongo';
const cors = require('cors');

const app = express();
app.use(cors())
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: '*:*'});


app.set('io', io);


/////////////////////////////////////

// io.sockets.on('connection', function (socket) {

//     socket.on('subscribe', function(data) { socket.join(data.room); })

//     socket.on('unsubscribe', function(data) { socket.leave(data.room); })

// });

// setInterval(function(){
//     io.sockets.in('global').emit('roomChanged', { chicken: 'tasty' });
// }, 1000);

/////////////////////////////////////

io.on('connection', function(socket){
  console.log("Connected==============")
  socket.on('new-message', function(msg){
    io.emit('new-message', msg);
    console.log("message: "+ msg)
  });
  
socket.on('subscribe', function(room, cb) {
    console.log('joining room', room);
    socket.join(room);
    cb('subscribed')
    // io.sockets.in(room).emit('message',{message: "JOINED ROOM"});
});

socket.on('unsubscribe', function(room, cb) {
    console.log('leaving room', room);
    socket.leave(room);
    cb('unsubscribed')
});

socket.on('message', function(data) {
    console.log('sending room post', data.room, data.message);
    // socket.broadcast.to(data.room).emit('message', {
    //     message: data.message
    // });
    io.sockets.in(data.room).emit('message',{message: data.message});
    // io.to(data.room).emit(data.message);

});
  
  
  socket.on('update', function(msg){
    io.emit('update', msg);
    console.log("updates: "+ msg)
  });
});



// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));



/**
 * 
 * Mongo DB / mongoose connections
 **/
 
// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/chat-app', {
//   useMongoClient: true,
 useNewUrlParser: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



/**
 * 
 * Source mapping for debugging errors
 **/

// add Source Map Support
SourceMapSupport.install();
app.use('/api', mongo_routes);


app.get('/', (req,res) => {
  return res.end('Api working');
})


// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});


server.listen(8081 || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = app.address();
  console.log("server listening at", process.env.IP + ":" + 8081);
});