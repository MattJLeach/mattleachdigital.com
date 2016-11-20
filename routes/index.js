var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');

var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
  	title: 'Home',
  	nav: 'home'
  });
});

router.get('/portfolio', function(req, res) {
	res.render('portfolio', {
		title: 'Portfolio',
		nav: 'portfolio'
	});
});

router.get('/blog', function(req, res) {
	Post.find({status: 'published'}).sort({ publishedDate: -1 }).exec(function(err, posts) {
		if (err) {
			console.error(err);
		}
		if (posts.length === 0) {
			posts = null;
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

router.post('/contact', function(req, res) {
	res.render('contact-confirmation', {
		title: 'Thank you',
		nav: 'contact',
		message: 'Thank you for getting in touch'
	});

	var transporter = nodemailer.createTransport({
		host: config.emailHost,
		port: config.emailPort,
		secure: false,
		auth: {
			user: config.emailUsername,
			pass: config.emailPassword
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	var mailOptions = {
		from: req.body.email,
		to: config.emailUsername,
		subject: 'Email from ' + req.body.name + ' recieved',
		html: '<p><strong>New contact form</strong></p><p>Name: ' + req.body.name + '</p>' + '<p>Email: ' + req.body.email + '</p><p>Phone: ' + req.body.phone + '</p><p>Reason: ' + req.body.reason + '</p><p>Message:<br />' + req.body.message
	}

	var replyOptions = {
		from: config.emailUsername,
		to: req.body.email,
		subject: 'Thank you for getting in touch',
		html: '<p>Thank you for getting in touch with me</p><p>Kind Regards<br />Matt Leach'
	}

	transporter.sendMail(mailOptions, function(err, info) {
		transporter.sendMail(replyOptions, function(err, info) {});
	});
});

module.exports = router;
