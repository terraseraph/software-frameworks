const assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

exports.removeDocument = function(db, id, callback) {
  var _id = new ObjectID(id);
  // Get the documents collection
  const collection = db.collection('products');
  // Delete document where a is 3
  collection.deleteOne({ _id : _id }, function(err, result) {
    console.log(err)
    assert.equal(err, null);
    // assert.equal(1, result.result.n);
    console.log("Removed the document", id);
    callback(result);
  });    
}