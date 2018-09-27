const assert = require('assert');
const app = require('../linearpoint')



  describe('Linear function', function() {
    it('2 * 1 + 4 = 6', function() {
    	var res = app.linear(2,1,4)
      assert.equal(res , 6);
    })
    it('2 * 0 + 4 = 4', function() {
    	var res = app.linear(2,0,4)
      assert.equal(res , 4);
    })
    it('2 * -1 + 4 = 2', function() {
    	var res = app.linear(2,-1,4)
      assert.equal(res , 2);
    })
  });