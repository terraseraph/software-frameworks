const assert = require('assert');
exports.findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('products');
  // Find some documents
  collection.find().toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}