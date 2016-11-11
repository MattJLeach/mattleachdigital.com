var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.get('/', function(req, res) {
  res.render('admin/index', {
  	title: 'Admin'
  });
});

router.get('/posts', function(req, res) {
	res.render('admin/posts', {
  	title: 'Posts'
  });
});

router.get('/posts/add', function(req, res) {
	res.render('admin/posts-add', {
		title: 'Add Post'
	});
});

module.exports = router;
