var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.get('/', function(req, res) {
  res.render('admin/index', {
  	title: 'Admin'
  });
});

router.get('/posts', function(req, res) {
	Post.find({}, function(err, posts) {
		res.render('admin/posts', {
	  	title: 'Posts',
	  	posts: posts
	  });
	});
});

router.get('/posts/add', function(req, res) {
	res.render('admin/posts-add', {
		title: 'Add Post'
	});
});

router.post('/posts/add', function(req, res) {
	Post.create(req.body.post, function(err, post) {
		if (err) {
			console.error(err);
		}
		res.redirect('/admin/posts');
	});
});

module.exports = router;
