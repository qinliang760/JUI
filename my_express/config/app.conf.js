var bodyParser = require("body-parser");
var glob = require("glob");

module.exports = function(app) {
	app.use(bodyParser.urlencoded({
		'extended': 'true'
	}));
	app.use(bodyParser.json());

}