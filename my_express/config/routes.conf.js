var path=require("path");
//var microServiceRoutes=require("../api/service");
var actionRoutes=require("../routes/action");

module.exports=function(app){
  var startTime=new Date();

  //app.use('/api/services',microServiceRoutes);
  app.use('/action',actionRoutes);

  app.route("/index").get(function(req,res){
      res.sendfile(path.join(__dirname,"..","index.html"))
  })
  app.route("/*").get(function(req,res){
      var uptime=`${new Date() - startTime}ms`;
      res.status(200).json({startTime,uptime})
  })

}