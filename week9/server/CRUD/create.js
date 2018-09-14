const assert = require('assert');


  // Get the documents collection

exports.createProduct = function(db, data, callback){
  const collection = db.collection('products');
  collection.insert(data, function(err, result){
    assert.equal(err, null);
    callback(result)
  })
}