const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const create = require('./CRUD/create')
const read = require('./CRUD/read')
const update = require('./CRUD/update')
const Delete = require('./CRUD/delete')

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  create.insertDocuments(db, function() {
    update.updateDocument(db, function() {
      Delete.removeDocument(db, function() {
      });
    });
  });
  read.findDocuments(db, function(res){
      console.log(res)
    //   client.close();
      
  })
});