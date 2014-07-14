var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var assert = chai.assert;

var supertest = require('supertest');
var express = require('express');
var http = require('http');
var nemauth = require('../../../lib/nem-auth');
var asyncTest = require('../../async-test-helper');

describe('Added Routing', function() {
  var url = 'http://localhost:3000'
  var app;
  var server;
  before(function(done) {
    app = express();
    nemauth.addRoutes(app);
    server = http.createServer(app);
    server.listen(3000);
    done();
  });  

  describe('Signin Route', function() {
    it('should have a valid signin route', function(done) {
      supertest(url)
        .get('/signin')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });      
    });
  });

  describe('Signup Route', function() {
    it('should have a valid singup route', function(done) {
      supertest(url)
        .post('/signup') 
        .send({})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should be able to sign a user up', function(done) {
        supertest(url)
          .post('/signup')
          .send({email: 'test@example.com', password: 'foobar123'})
          .end(function(err, res) {
            if(err) {
              return done(err);
            }
            setTimeout(function() {
              try {
                expect(typeof res._id).to.not.eql('undefined');
                done();
              } catch(e) {
                done(e);
              }
            }, 100);
          });
    });
  });
});
