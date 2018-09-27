var http = require('http');
var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

// var server = require('./server.js');
var api = `http://software-frameworks-terraseraph.c9users.io:8081/api`;


//Tests that fail
	describe("Fail tests for users", function() {
		it('Should return a list of users', function(done) {
			http.get(api+'/users', function(response) {
				assert.equal(response.statusCode, 200);
                var body = '';
				response.on('data', function(d) {
					body += d;
				});
				response.on('end', function() {
				    body = JSON.parse(body)
				    // console.log(body)
					assert.equal(body.success, false);
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
				    // console.log(body)
					assert.equal(body.success, false);
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
				    // console.log(body)
					assert.equal(body.success, false);
				});
			    done();
			});
		});
	});

//RUN FROM node_modules/mocha/bin/mocha test