const assert = require('assert');
exports.insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('products');
  collection.drop()
  // Insert some documents
  collection.insertMany([
    {
        id : 0,
        name : "p1",
        price : 123.45,
        type : "something",
        description : "product 1"
        
    },
    {
        id : 1,
        name : "p2",
        price : 12223.45,
        type : "something else",
        description : "product 2"
        
    },
    {
        id : 2,
        name : "p3",
        price : 123.4567,
        type : "some other thing",
        description : "product 3"
        
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}