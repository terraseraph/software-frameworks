const assert = require('assert');

exports.getAllDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('products');
  // Find some documents
  collection.find().toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    callback(docs);
  });
}

exports.searchDocuments = function(db, data, callback) {
  // Get the documents collection
  const collection = db.collection('products');
  // Find some documents
  collection.find( {$or : [{name : data.value}, {description : data.value}]}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}