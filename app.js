'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var wikiRouter = require('./routes/wiki.js');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

app.use(morgan('dev'));

// body parsing middleware
// for HTML form submits
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // would be for AJAX requests

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.use('/', wikiRouter);
app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, function(){console.log("listening on port 3000")});