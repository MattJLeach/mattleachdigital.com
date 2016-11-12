var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.get('/', function(req, res) {
  res.render('admin/index', {
  	title: 'Admin',
  	nav: 'admin'
  });
});

// Show all posts
router.get('/posts', function(req, res) {
	Post.find().sort({ status: 1, updatedAt: -1, publishedDate: -1 }).exec(function(err, posts) {
		res.render('admin/posts', {
	  	title: 'Posts',
	  	nav: 'posts',
	  	posts: posts
	  });
	});
});

// Add new post
router.get('/posts/add', function(req, res) {
	res.render('admin/post-add', {
		title: 'Add Post',
		nav: 'posts',
		js: ['/js/admin.js']
	});
});

// Create new post
router.post('/posts/add', function(req, res) {
	var published;

	if (req.body.status == 'published') {
		published = Date.now();
	}

	var post = new Post({
		title: req.body.title,
		slug: req.body.slug,
		status: req.body.status,
		publishedDate: published,
		body: req.body.body
	});

	post.save(function(err, post) {
		if (err) {
			console.error(err);
		}
		res.redirect('/admin/posts');
	});
});

// Edit exisitng post
router.get('/posts/:id/edit', function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		if (err) {
			console.error(err);
		}
		console.log(post);
		res.render('admin/post-edit', {
			title: 'Edit Post',
			nav: 'posts',
			post: post
		});
	});
});

// Update existing post
router.put('/posts/:id', function(req, res) {
	console.log(req.body.publishedDate);
	res.send('test');
});

// Delete existing post
router.delete('/posts/:id', function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/admin/posts');
	})
});

module.exports = router;
