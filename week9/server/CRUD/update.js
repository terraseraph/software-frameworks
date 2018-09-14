const assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

exports.updateDocument = function(db, data, callback) {
  
  // var _id = new ObjectID(data._id);
  // Get the documents collection
  const collection = db.collection('products');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ id : data.id }, { $set: data }, function(err, result) {
    assert.equal(err, null);
    // assert.equal(1, result.result.n);
    console.log("Updated the document");
    // console.log(result);
    callback(result)
  });  
}