const assert = require('assert');
exports.updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('products');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ id : 0 }, { $set: { id : 5 } }, function(err, result) {
    assert.equal(err, null);
    // assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 0");
    // console.log(result);
    callback(result)
  });  
}