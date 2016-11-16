var express = require('express');
var router = express.Router();

var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Home',
  	nav: 'home'
  });
});

router.get('/blog', function(req, res) {
	Post.find({status: 'published'}).sort({ publishedDate: -1 }).exec(function(err, posts) {
		if (err) {
			console.error(err);
		}
		res.render('blog', {
			title: 'Blog',
			nav: 'blog',
			posts: posts
		});
	});
});

router.get('/blog/:slug', function(req, res) {
	Post.findOne({slug: req.params.slug}, function(err, post) {
		if (err) {
			return console.error(err);
		}
		if (!post) {
			return console.log('No post found!')
		}
		res.render('post', {
			title: post.title,
			nav: 'blog',
			post: post
		});
	});
});

router.get('/contact', function(req, res) {
	res.render('contact', {
		title: 'Contact Me',
		nav: 'contact'
	});
});

module.exports = router;
