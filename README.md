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
infrastructure({}, function(err, env){
  if(err) console.error(err);
  console.log("Application started");
});
```

## Creating config folder
```bash
mkdir -p config/structures
```

