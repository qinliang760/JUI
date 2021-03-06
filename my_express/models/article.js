var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise=require("bluebird");
mongoose.Promise = Promise;

var ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
});

ArticleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

module.exports=mongoose.model('Article', ArticleSchema);

