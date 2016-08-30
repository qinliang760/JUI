var mongoose=require("mongoose");
var bluebird=require("bluebird");

mongoose.Promise=bluebird;

module.exports=function(){
	mongoose.connect(process.env.MONGODB_URI);
	mongoose.connection.on("error",function(err){
		console.error(`MongoDB connection error: ${err}`);
		process.exit(-1);
	})
}