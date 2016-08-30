var mongoose = require('mongoose');
var Article=require('../models/article');



module.exports=function(){
	function handleError(res, statusCode,err){
		return 1111;
		  //var statusCode = statusCode || 500;
  		//return function(err){res.status(statusCode).send(err);}
	}
function respondWithResult(res, statusCode) {
  var statusCode = statusCode || 200;

  return function(entity){
    if (entity) {
      return res.status(statusCode).json(entity);
    }  	
	}
}
	function index(req, res){
		console.log(res);
		//console.log(res);
		return Article.find()
			.then(respondWithResult(res));
    		//.catch(handleError(res));
	}

	function create(req, res){
		console.log(res);
		//console.log(res);
		return Article.find()
			.then(respondWithResult(res));
    		//.catch(handleError(res));
	}
	function update(req, res){
		console.log(res);
		//console.log(res);
		return Article.find()
			.then(respondWithResult(res));
    		//.catch(handleError(res));
	}
	function destroy(req, res){
		console.log(res);
		//console.log(res);
		return Article.find()
			.then(respondWithResult(res));
    		//.catch(handleError(res));
	}		


	return {index};
}

