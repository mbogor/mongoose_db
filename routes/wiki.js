'use strict';
var express = require('express');
var router = express.Router();
var model = require('../models');


module.exports = router;

var userModel = model.User;
var pageModel = model.Page;

router.get('/', function(req, res, next){
	// res.redirect('/');
	res.render('wikipage');
});

router.post('/wiki/', function(req, res, next){
	res.json(req.body);
});

router.get('/wiki/add', function(req, res, next){
	res.render('addpage');
});

// json post request:
// {"author_name":"Emma","author_email":"me@gh.com","title":"Test","page_content":"Contents!","open":"","closed":""}