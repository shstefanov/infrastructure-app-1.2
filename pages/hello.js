var Page = require("infrastructure-express/Page");
module.exports = Page.extend("HelloPage", {
  root: "/",
  title: "Hello Page",
  template: "hello.mustache",
  "GET /hello": "@render | req, res"
});