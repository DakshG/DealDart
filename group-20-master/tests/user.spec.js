const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('./config');
const assert = require('assert');
const helper = require('./helper');

chai.use(chaiHttp);

describe('User', function() {
  let username = helper.generateUsername();

  /**
   * Tests the register page
   */
  describe('Register', function() {
    /**
     * When the guest successfully registers it returns successful.
     */
    it('should return 200 when the user successfully registers an account', function() {
      chai.request(config.connection.host).post('/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username: username, password: 'test', firstName: 'test', lastName: 'test', email: username + '@test.com'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
      });
    });

    /**
     * When the username is taken the server shouldn't allow a guest to register.
     */
    it('should return an error when the email is taken', function() {
      chai.request(config.connection.host).post('/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username: 'test5760659580', password: 'test', firstName: 'test', lastName: 'test', email: 'test@test.com'})
      .end(function(err, res) {
        assert.equal(res.body, false);
      });
    });
  });

  /**
   * Tests the login page
   */
  describe('Login', function() {
    it('should return 200 when the user successfully logins to an account', function() {
      chai.request(config.connection.host).post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username: 'test5760659580', password: 'test'})
      .end(function(err, res) {
        if(err) done(err);
        assert.equal(res.status, 200);
      });
    });
  });
});