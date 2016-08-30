var express=require("express");
var appConfig=require("./config/app.conf");
var dbConfig=require("./config/db.conf");
var routesConfig=require("./config/routes.conf");
var dotenv=require("dotenv-safe");

var app=express();

dotenv.load({
  path: `${__dirname}/config/.env`,
  sample: `${__dirname}/.env.example`,
  allowEmptyValues: false
});

appConfig(app);
dbConfig();
routesConfig(app);

app.listen(process.env.PORT, function () {
  console.log('Express server listening on port ' + process.env.PORT);
});