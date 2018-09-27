const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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

//GET ALL PRODUCTS
app.get('/products', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    read.getAllDocuments(db, function(data){
        console.log(data)
        data.success = true
        res.send(data)
    })    
  });  
})


//Search PRODUCTS
app.post('/products/search', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    read.searchDocuments(db, req.body, function(data){
        console.log(data)
        data.success = true
        res.send(data)
    })
  });  
})



//Create new product
app.post('/products', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    create.createProduct(db, req.body, function(data) {
      data.success = true
      res.send(data)
    });
  });  
})

//UPDATE
app.put('/products', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    update.updateDocument(db, req.body, function(data) {
      data.success = true
      res.send(data)
    });

  });
})


//DELETE PRODUCT PRODUCTS
app.delete('/products/:id', function(req, res){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server", req.params.id);
    const db = client.db(dbName);
      Delete.removeDocument(db, req.params.id, function(data) {
        data.success = true
        res.send(data)
      });

  });  
})

server.listen(8081 || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = app.address();
  console.log("server listening at", process.env.IP + ":" + 8081);
});