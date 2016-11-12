var express = require('express');
var router = express.Router();

var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Matt Leach',
  	subTitle: 'Musings of a Javascript developer'
  });
});

router.get('/blog', function(req, res) {
	Post.find({status: 'published'}, function(err, posts) {
		if (err) {
			console.error(err);
		}
		res.render('blog', {
			title: 'Blog',
			posts: posts
		});
	});
});

module.exports = router;
