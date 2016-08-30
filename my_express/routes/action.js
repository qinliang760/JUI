var express=require("express");
var router =express.Router();
var path=require("path");

router.get('/:page', function(req,res){
	console.log(req.params.page);
	var page=req.params.page;
	require(path.join(__dirname,"../controllers/",page))().index(req,res);
});
router.post('/:page', function(req,res){
	console.log(req.params.page);
	var page=req.params.page;
	require(path.join(__dirname,"../controllers/",page))().update(req,res);
});

module.exports=router;