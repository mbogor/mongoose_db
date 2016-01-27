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
	
	var statusV, preurlTitle;
	if (req.body.open == 'on'){
		statusV = "open"
	} else {
		statusV = 'closed'
	}

	//create a new document, an instance of pageModel
	var page = new pageModel({
		title: req.body.title,
		content: req.body.page_content,
		status: statusV,
		//author: 
	});

	//before save(), get url from page title, assign random string to page title & url if necessary
	page.pre('validate', function(next){
		page.urlTitle = makeURLTitle(req.body.title);
		if(req.body.title.length == 0) page.title = 'Random Title ' + page.urlTitle;
		next();
	});

	page.save()
	.then(function(){
		res.redirect('/wiki/' + page.urlTitle);
	})
	.then(null, function(err){console.log(err)});
});

router.get('/wiki/add', function(req, res, next){
	res.render('addpage');
});

router.get('/wiki/:urlTitle', function(req, res, next){
	pageModel.findOne({urlTitle: req.params.urlTitle}).exec()
	.then(function(page){
		console.log(page);
		res.render('wikipage', page);
	})
	.then(null, function(err){console.log(err)});
});

function makeURLTitle (title) {
	if(title.length>0){
		return title.replace(/\s+/g, '_').replace(/\W+/g, '');	
	}
	return Math.random().toString(36).substring(2,7);
}
// json post request:
// {"author_name":"Emma","author_email":"me@gh.com","title":"Test","page_content":"Contents!","open":"","closed":""}