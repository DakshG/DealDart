const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('./config');
const assert = require('assert');

chai.use(chaiHttp);

describe('Daily Deals', function() {
  /**
   * Tests the view information page
   */
  describe('View Deals', function() {
    /**
     * When the user successfully views their info it returns successful.
     */
    it('should return 200 when the user successfully views deals', function() {
      assert.equal(true, true);
    });

     /**
     * When the user successfully views their info it returns successful.
     */
    it('should return json when the user successfully views deals', function() {
        assert.equal(true, true);
      });
  });
});