var infrastructure = require("infrastructure");
infrastructure({}, function(err, env){
  if(err) console.error(err);
  console.log("Application started");
});