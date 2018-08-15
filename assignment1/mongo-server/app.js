import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';



// import routes
import mongo_routes from './routes/mongo';


// define our app using express
const app = express();



// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})



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


app.listen(8081 || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = app.address();
  console.log("server listening at", process.env.IP + ":" + 8081);
});