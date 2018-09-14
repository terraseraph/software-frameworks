import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const cors = require('cors');
const app = express();
app.use(cors())
const server = require('http').Server(app);


const create = require('./CRUD/create')
const read = require('./CRUD/read')
const update = require('./CRUD/update')
const Delete = require('./CRUD/delete')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'week9';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  create.insertDocuments(db, function() {
    update.updateDocument(db, function() {
      Delete.removeDocument(db, function() {
        read.findDocuments(db, function(res){
            console.log(res)
            client.close();
            
        })
      });
    });
  });
});


//GET ALL PRODUCTS
app.get('/products', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    read.findDocuments(db, function(res){
        console.log(res)
        client.close();
    })    
  });  
})


//Create new product
app.post('/products', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    create.insertDocuments(db, function() {
    });
  });  
})

//UPDATE
app.put('/products', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    update.updateDocument(db, function() {
    });

  });
})


//DELETE PRODUCT PRODUCTS
app.delete('/products/:id', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
      Delete.removeDocument(db, function() {
      });

  });  
})

server.listen(8081 || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = app.address();
  console.log("server listening at", process.env.IP + ":" + 8081);
});