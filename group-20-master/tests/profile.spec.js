const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('./config');
const assert = require('assert');
const helper = require('./helper');

chai.use(chaiHttp);

const token = new Promise((done) => {
  chai.request(config.connection.host).post('/login')
  .set('content-type', 'application/x-www-form-urlencoded')
  .send({username: 'test5760659580', password: 'test'})
  .end(function(err, res) {
    if(err) done(err);
    done(res.body.token);
  });
});

describe('Profile', function() {
  /**
   * Tests the view information page
   */
  describe('View Information', function() {
    /**
     * When the user successfully views their info it returns successful.
     */
    it('should return 200 when the user successfully views information', function() {
      token.then((result) => {
        chai.request(config.connection.host).get('/user/profile')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set({Authorization: "Bearer " + result})
        .end(function(err, res) {
          if(err) done(err);
          assert.equal(res.status, 200);
        });
      });
    });
  });

  /**
   * Tests the change information page
   */
  describe('Change Information', function() {
    it('should return 200 when the user successfully changes info to an account', function() {
      token.then((result) => {
        chai.request(config.connection.host).post('/user/changeinfo')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set({Authorization: "Bearer " + result})
        .send({username: "test5760659580",
          firstname: "test",
          lastname: "test",
          email: "test@test.com"})
        .end(function(err, res) {
          if(err) done(err);
          assert.equal(res.status, 200);
        });
      });
    });
  });

  /**
   * Tests the change password page
   */
  describe('Change Password', function() {
    it('should return 200 when the user successfully changes the password to an account', function() {
      token.then((result) => {
        chai.request(config.connection.host).post('/user/changepass')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set({Authorization: "Bearer " + result})
        .send({username: "test5760659580",
          password: "test",
          })
        .end(function(err, res) {
          if(err) done(err);
          assert.equal(res.status, 200);
        });
      });
    });
  });
});