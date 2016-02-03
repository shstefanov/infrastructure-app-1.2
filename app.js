var infrastructure = require("infrastructure");
infrastructure({ mode: "development" }, function(err, env){
  if(err) console.error(err);
  console.log("Application started");
});