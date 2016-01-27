'use strict';
var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', function(req, res, next){
	console.log('we are in router');
	res.status(200);
	res.end();
});


