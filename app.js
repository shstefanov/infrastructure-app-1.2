var infrastructure = require("infrastructure");
infrastructure({ mode: "development" }, function(err, env){
  if(err) console.error(err);
  env.i.do("log.debug", "About what", "Some value");
});