var dotenv = require('dotenv')
var express = require('express');
var router = express.Router();

dotenv.config()

var MongoClient = require('mongodb').MongoClient;
var url = process.env.ATLAS_URL ;

// console.log(url)


router.get('/', (req, res, next) => {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("<database>");
		dbo.collection("collection1").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log('Mongo data coming in hot')
    		console.log(result);
    		res.json(result)
    		db.close();
    	});
	}); 
});

module.exports = router;