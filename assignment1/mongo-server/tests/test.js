var http = require('http');
var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

// var server = require('./server.js');
var api = `http://software-frameworks-terraseraph.c9users.io:8081/api`;
var temp_id

describe('User Tests', function() {

	describe(api+'/users', function() {
		it('Should return a list of users', function(done) {
			http.get(api+'/users', function(response) {
				assert.equal(response.statusCode, 200);
                var body = '';
				response.on('data', function(d) {
					body += d;
				});
				response.on('end', function() {
				    body = JSON.parse(body)
				    console.log(body)
					assert.equal(body.success, true);
				});
			    done();
			});
		});
	});
	
	
	describe(api+'/channel', function() {
		it('Should return a list of channels', function(done) {
			http.get(api+'/channel', function(response) {
				assert.equal(response.statusCode, 200);
                var body = '';
				response.on('data', function(d) {
					body += d;
				});
				response.on('end', function() {
				    body = JSON.parse(body)
				    console.log(body)
					assert.equal(body.success, true);
				});
			    done();
			});
		});
	});
	
	
	describe(api+'/group', function() {
		it('Should return a list of groups', function(done) {
			http.get(api+'/group', function(response) {
				assert.equal(response.statusCode, 200);
                var body = '';
				response.on('data', function(d) {
					body += d;
				});
				response.on('end', function() {
				    body = JSON.parse(body)
				    console.log(body)
					assert.equal(body.success, true);
				});
			    done();
			});
		});
	});
	
	
	describe(api+'/group/add_group', function() {
	    var dat = {
	        group_name: "test_group",
            group_admins: "test_group_admin"
	    }
        it("Create a new group", function(done) {
            // Send some Form Data
             chai.request(api)
            .post('/group/add_group')
            .send(dat)
            .end(function (err, res) {
                // chai.expect(res.body).to.be.json;   
                chai.expect(res).to.have.status(200);
                console.log(res.body)
                temp_id = res.body.message._id
                assert.equal(res.body.success, true);
                done();
            });
        });
	});
	
	
	describe(api+'/group/update_group', function() {
	    var dat = {
	        id : temp_id,
	        group_name: "update_test_group",
            group_admins: ["update_test_group_admin"],
            group_users: ["update_test_users"]
	    }
        it("Update a group", function(done) {
            // Send some Form Data
             chai.request(api)
            .post('/group/update_group')
            .send(dat)
            .end(function (err, res) {
                // chai.expect(res.body).to.be.json;   
                chai.expect(res).to.have.status(200);
                console.log(res.body)
                assert.equal(res.body.success, true);
                done();
            });
        });
	});
	
	
	describe(api+'/group/remove_group', function() {
	    var dat = {
	        id : temp_id,
	        group_name: "update_test_group",
            group_admins: ["update_test_group_admin"],
            group_users: ["update_test_users"]
	    }
        it("Create remove a group", function(done) {
            // Send some Form Data
             chai.request(api)
            .post('/group/remove_group')
            .send(dat)
            .end(function (err, res) {
                // chai.expect(res.body).to.be.json;   
                chai.expect(res).to.have.status(200);
                console.log(res.body)
                assert.equal(res.body.success, true);
                done();
            });
        });
	});
	
	
	describe(api+'/channel/add_channel', function() {
	    var dat = {
          channel_name: "test channel name",
          group_id: "test_id",
          channel_users: ['test_user']
	    }
        it("Create a new channel", function(done) {
            // Send some Form Data
             chai.request(api)
            .post('/channel/add_channel')
            .send(dat)
            .end(function (err, res) {
                // chai.expect(res.body).to.be.json;   
                chai.expect(res).to.have.status(200);
                console.log(res.body)
                temp_id = res.body.message._id
                assert.equal(res.body.success, true);
                done();
            });
        });
	});
	
	describe(api+'/channel/update_channel', function() {
	    var dat = {
	        id : temp_id,
	        group_name: "update_test_group",
            group_admins: ["update_test_group_admin"],
            group_users: ["update_test_users"]
	    }
        it("Update a channel", function(done) {
            // Send some Form Data
             chai.request(api)
            .post('/channel/update_channel')
            .send(dat)
            .end(function (err, res) {
                // chai.expect(res.body).to.be.json;   
                chai.expect(res).to.have.status(200);
                console.log(res.body)
                assert.equal(res.body.success, true);
                done();
            });
        });
	});
	
	describe(api+'/channel/remove_channel', function() {
	    var dat = {
	        id : temp_id
	    }
        it("remove a channel", function(done) {
            // Send some Form Data
             chai.request(api)
            .post('/channel/remove_channel')
            .send(dat)
            .end(function (err, res) {
                // chai.expect(res.body).to.be.json;   
                chai.expect(res).to.have.status(200);
                console.log(res.body)
                assert.equal(res.body.success, true);
                done();
            });
        });
	});
	
	
	
	
});

//RUN FROM node_modules/mocha/bin/mocha test