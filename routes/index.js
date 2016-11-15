var express = require('express');
var router = express.Router();

var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Home'
  });
});

router.get('/blog', function(req, res) {
	Post.find({status: 'published'}).sort({ publishedDate: -1 }).exec(function(err, posts) {
		if (err) {
			console.error(err);
		}
		res.render('blog', {
			title: 'Blog',
			js: ['https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.16.0/moment.min.js'],
			posts: posts
		});
	});
});

module.exports = router;
