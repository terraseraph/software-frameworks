const assert = require('assert');
exports.removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('products');
  // Delete document where a is 3
  collection.deleteOne({ id : 3 }, function(err, result) {
    assert.equal(err, null);
    // assert.equal(1, result.result.n);
    console.log("Removed the document with the field id equal to 3");
    callback(result);
  });    
}