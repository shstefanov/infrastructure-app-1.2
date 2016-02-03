var assert = require("assert");
var infrastructure_test = require("infrastructure/test_env");

describe("Start/stop application", function(){
  var env;
  it("Starts application", function(next){
    infrastructure_test.start({ /* initial config here (mode will be always "test") */ }, function(err, _env){
      assert.equal(err, null);
      env = _env;
      next();
    });
  });

  it("Stops application", function(next){
    env.stop(function(err){
      assert.equal(err, null);
      next();
    });
  });

});