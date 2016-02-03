## Create project

```bash
$> mkdir infrastructure-app
$> cd infrastructure-app
$> npm init -y
$> git init
$> echo node_modules > .gitignore
```


## Installing infrastructure

```bash
$> npm install infrastructure@1.2.0 --save
```

## Creating app entry point

app.js
```javascript
var infrastructure = require("infrastructure");
infrastructure({ /* This object will be initial config */ }, function(err, env){
  if(err) console.error(err);
  console.log("Application started");
});
```

## Creating config folder
This folder will be bundled into large object tree and will be merged with initial config.
'structures' branch will define workers that will work in our application.
```bash
$> mkdir -p config/structures
```

## Turn on the logger
The logger is structure worker, it's configuration is mounted here:

config/structures/log.json
```json
{
  "engine": "log",
  "options": {
    "sys": true
  }
}
```
Running the application will show some logs:
```bash
$> node app.js
[sys]  [2016-02-02 22:35:54][logger]........................... options: sys
[sys]  [2016-02-02 22:35:54][application started].............. 55ms, process_mode: single, application mode: undefined
Application started
```

## Choosing aplication mode
If we have property 'mode', mounted on our config root (initial config or config folder), a branch with such name will be used to patch entire config tree.
It can be set in initial config or config folder.
app.js
```javascript
var infrastructure = require("infrastructure");
infrastructure({ mode: "development" }, function(err, env){
  if(err) console.error(err);
  console.log("Application started");
});
```

## Adding specific configuration for this mode
```bash
$> mkdir -p config/development/structures
$> cp config/structures/log.json config/development/structures/
```

Then edit config/development/structures/log.json to add more log options
```json
{
  "options": {
    "debug": true
  }
}
```
Using new option to output something.
```javascript
var infrastructure = require("infrastructure");
infrastructure({ mode: "development" }, function(err, env){
  if(err) console.error(err);
  env.i.do("log.debug", "About what", "Sone value");
});
```
Running app will show more our new log:
```bash
$> node app.js
[sys]  [2016-02-02 22:35:54][logger]........................... options: sys
[sys]  [2016-02-02 22:35:54][application started].............. 55ms, process_mode: single, application mode: development
[debug]  [2016-02-03 12:54:06][About what]....................... Sone value
```

## Write a test

```bash
$> npm install mocha --save
$> mkdir test
```

somewhere in package.json
```json
{
  "scripts": {
    "test": "mocha --recursive --colors --sort --check-leaks --full-trace --throw-deprecation test"
  }
}

```


test/run.js
```javascript
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
```

Turn off logger in test mode

config/test/structures/log.json
```json
{
  "options": {
    "sys": false
  }
}
```

Run the test
```bash
$> npm test

> infrastructure-app@1.0.0 test /home/stefan/projects/infrastructure-app
> mocha --recursive --colors --sort --check-leaks --full-trace --throw-deprecation test



  Start/stop application
    ✓ Starts application (52ms)
    ✓ Stops application


  2 passing (65ms)

```