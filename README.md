## Create project

```bash
mkdir infrastructure-app
cd infrastructure-app
npm init -y
git init
echo node_modules > .gitignore
```


## Installing infrastructure

```bash
npm install infrastructure@1.2.0 --save
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
mkdir -p config/structures
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
$ node app.js
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