var http = require('http');
var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const create = require('../CRUD/create')
const read = require('../CRUD/read')
const update = require('../CRUD/update')
const Delete = require('../CRUD/delete')

// var server = require('./server.js');
var api = `http://software-frameworks-terraseraph.c9users.io:8081/products`;
var temp_id = "test1"

describe('HTTP Tests', function() {

	describe("Get all products", function() {
		it('Should get all products ', function(done) {
			http.get(api, function(response) {
				assert.equal(response.statusCode, 200);
                var body = '';
				response.on('data', function(d) {
					body += d;
				});
				response.on('end', function() {
				    body = JSON.parse(body)
				    console.log(body)
					chai.expect(body).to.be.a('Array')
				});
			    done();
			});
		});
	});
	
	describe("Test product search", function() {
	    var dat = {
	        value : '9'
	    }
        it("Should return an object", function(done) {
            // Send some Form Data
             chai.request(api)
            .post('/search')
            .send(dat)
            .end(function (err, res) {
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.a('Object')
                console.log(temp_id)
                console.log(res.body)
                done();
            });
        })
	})
	
    describe("Test product create", function() {
	    var dat = {
	      id: 55,
          name : "test",
          price : 123,
          type : "testP",
          description : "test desc"
	    }
        it("Should return an object", function(done) {
            
            // Send some Form Data
             chai.request(api)
            .post('/')
            .send(dat)
            .end(function (err, res) {
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.a('Object')
                temp_id = res.body.ops[0]._id
                console.log(res.body)
                done();
            });
        })
	})
	
    describe("Test product update", function() {
	    var dat = {
	      id : 55,
          name : "test",
          price : 123456,
          type : "testUpdate",
          description : "test desc"
	    }
        it("Should return an object", function(done) {
            
            // Send some Form Data
             chai.request(api)
            .put('/')
            .send(dat)
            .end(function (err, res) {
                chai.expect(res).to.have.status(500);
                chai.expect(res).to.be.a('Object')
                console.log(temp_id)
                console.log(res.body)
                done();
            });
        })
	})
	
    describe("Test product delete", function() {
        it("Should return an object", function(done) {
            
            // Send some Form Data
             chai.request(api)
            .delete('/'+temp_id)
            .end(function (err, res) {
                chai.expect(res).to.have.status(500);
                chai.expect(res).to.be.a('Object')
                console.log(temp_id)
                console.log(res.body)
                done();
            });
        })
	})
	
	
		
	
	
	
// });




// describe('API function Tests', function() {
	
// 	describe("Group Add, update, delete", function() {
// 	    var dat = {
// 	        group_name: "test_api_group",
//             group_admins: "test_group_admin"
// 	    }
//         it("Create a new group", function(done) {
//             // Send some Form Data
//              chai.request(api)
//             .post('/group/add_group')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(res.body)
//                 temp_id = res.body.message._id
//                 console.log(temp_id)
//                 console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 assert.equal(res.body.message.group_name, 'test_api_group')
//                 done();
//             });
//         })
//         it("Update a group", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id,
// 		        group_name: "update_test_group",
// 	            group_admins: ["update_test_group_admin"],
// 	            group_users: ["update_test_users"]
// 		    }            
//              chai.request(api)
//             .post('/group/update_group')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 console.log(temp_id)
//                 console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 assert.equal(res.body.message.group_name, 'update_test_group')
//                 done();
//             });
//         })
//         it("remove a group", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id
// 		    }
//              chai.request(api)
//             .post('/group/remove_group')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 console.log(temp_id)
//                 console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         });        
// 	});
	
	
// 	describe("Channel create, update, delete", function() {
// 		var temp_id
// 	    var dat = {
// 	      _id : temp_id,
//           channel_name: "test channel name",
//           group_id: "test_id",
//           channel_users: ['test_user']
// 	    }
//         it("Create a new channel", function(done) {
//             // Send some Form Data
//              chai.request(api)
//             .post('/channel/add_channel')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(res.body)
//                 temp_id = res.body.message._id
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         })
//         it("Update a channel", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id,
// 		        group_name: "update_test_group",
// 	            group_admins: ["update_test_group_admin"],
// 	            group_users: ["update_test_users"]
// 		    }            
// 	        chai.request(api)
// 	        .post('/channel/update_channel')
// 	        .send(dat)
// 	        .end(function (err, res) {
// 	            // chai.expect(res.body).to.be.json;   
// 	            chai.expect(res).to.have.status(200);
// 	            console.log(temp_id)
// 	            console.log(res.body)
// 	            assert.equal(res.body.success, true);
// 	            done();
// 	        });
//         })
//         it("remove a channel", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id
// 		    }
//             chai.request(api)
//             .post('/channel/remove_channel')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 console.log(temp_id)
//                 console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         });
// 	});


// 	describe("User create, update, delete", function() {
// 		var temp_id
// 	    var dat = {
// 	      _id : temp_id,
//           username: "testUser",
//           password: "123",
//           role: "user"
// 	    }
//         it("Create a new user", function(done) {
//             // Send some Form Data
//              chai.request(api)
//             .post('/users')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 // console.log(res.body)
//                 temp_id = res.body.message._id
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         })
//         it("Update a user", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id,
// 		        username: "update_user_name",
// 	            password: "321",
// 	            role: "super"
// 		    }            
// 	        chai.request(api)
// 	        .post('/users/edit')
// 	        .send(dat)
// 	        .end(function (err, res) {
// 	            // chai.expect(res.body).to.be.json;   
// 	            chai.expect(res).to.have.status(200);
// 	            console.log(temp_id)
// 	            console.log(res.body)
// 	            assert.equal(res.body.success, true);
// 	            done();
// 	        });
//         })
//         it("remove a user", function(done) {
//             // Send some Form Data
// 		    var dat = {
// 		        id : temp_id
// 		    }
//             chai.request(api)
//             .post('/users/remove')
//             .send(dat)
//             .end(function (err, res) {
//                 // chai.expect(res.body).to.be.json;   
//                 chai.expect(res).to.have.status(200);
//                 console.log(temp_id)
//                 console.log(res.body)
//                 assert.equal(res.body.success, true);
//                 done();
//             });
//         });
// 	});
});


//Tests that fail
	// describe("Fail tests for users", function() {
	// 	it('Should return a list of users', function(done) {
	// 		http.get(api+'/users', function(response) {
	// 			assert.equal(response.statusCode, 200);
 //               var body = '';
	// 			response.on('data', function(d) {
	// 				body += d;
	// 			});
	// 			response.on('end', function() {
	// 			    body = JSON.parse(body)
	// 			    // console.log(body)
	// 				assert.equal(body.success, false);
	// 			});
	// 		    done();
	// 		});
	// 	});
	// });
	
	// describe(api+'/channel', function() {
	// 	it('Should return a list of channels', function(done) {
	// 		http.get(api+'/channel', function(response) {
	// 			assert.equal(response.statusCode, 200);
 //               var body = '';
	// 			response.on('data', function(d) {
	// 				body += d;
	// 			});
	// 			response.on('end', function() {
	// 			    body = JSON.parse(body)
	// 			    // console.log(body)
	// 				assert.equal(body.success, false);
	// 			});
	// 		    done();
	// 		});
	// 	});
	// });
	
	
	// describe(api+'/group', function() {
	// 	it('Should return a list of groups', function(done) {
	// 		http.get(api+'/group', function(response) {
	// 			assert.equal(response.statusCode, 200);
 //               var body = '';
	// 			response.on('data', function(d) {
	// 				body += d;
	// 			});
	// 			response.on('end', function() {
	// 			    body = JSON.parse(body)
	// 			    // console.log(body)
	// 				assert.equal(body.success, false);
	// 			});
	// 		    done();
	// 		});
	// 	});
	// });

//RUN FROM node_modules/mocha/bin/mocha test