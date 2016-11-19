var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var Post = require('../models/post');
var User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
  	User.findOne({ username: username }, function(err, user) {
  		console.log(user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, function(err, res) {
      	if (err) {
      		console.log('There was an error');
      	} 
      	if (!res) {
      		console.log('No result');
      		return done(null, false, { message: 'Incorrect password'});
      	}
      	return done(null, user);
      });
    });
  }
));

router.get('/', ensureAuthenticated, function(req, res) {
  res.render('admin/index', {
  	title: 'Admin',
  	nav: 'admin'
  });
});

router.get('/setup', function(req, res) {
	User.findOne(function(err, doc) {
		if (doc) {
			return res.redirect('/admin/login');
		}
		res.render('admin/setup');
	});
});

router.post('/setup', function(req, res) {
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(password);
	
	var errors = req.validationErrors();

	if (errors) {
		return res.render('admin/setup', {
			errors: errors
		});
	}
	var newUser = new User({
		username: username,
		password: password,
		email: email
	});

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save();
		});
	});
	
	res.redirect('/admin/login');
});

router.get('/login', function(req, res) {
	res.render('admin/login', {
		title: 'Login'
	});
});

router.post('/login',
	passport.authenticate('local', { failureRedirect: '/admin/login' }),
	function(req, res) {
		res.redirect('/admin');
	});

// Show all posts
router.get('/posts', ensureAuthenticated, function(req, res) {
	Post.find().sort({ status: 1, updatedAt: -1, publishedDate: -1 }).exec(function(err, posts) {
		res.render('admin/posts', {
	  	title: 'Posts',
	  	nav: 'posts',
	  	posts: posts
	  });
	});
});

// Add new post
router.get('/posts/add', ensureAuthenticated, function(req, res) {
	res.render('admin/post-add', {
		title: 'Add Post',
		nav: 'posts',
		js: ['/js/admin.js']
	});
});

// Create new post
router.post('/posts/add', ensureAuthenticated, function(req, res) {
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

// Preview post
router.get('/posts/:id', ensureAuthenticated, function(req, res) {
	// Complete this route once I have complated the single post view
});

// Edit exisitng post
router.get('/posts/:id/edit', ensureAuthenticated, function(req, res) {
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
router.put('/posts/:id', ensureAuthenticated, function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		if (err) {
			return res.send('Oh crap, there was an error');
		}
		if (!post) {
			return res.send('Could not find post');
		}
		var published;
		if (req.body.publishedDate != 'Not yet published') {
			published = post.publishedDate;
		} else if (req.body.status == 'published' && req.body.publishedDate == 'Not yet published') {
			published = Date.now();
		}
		var update = {$set: {
			title: req.body.title,
			slug: req.body.slug,
			status: req.body.status,
			publishedDate: published,
			body: req.body.body
		}}
		Post.update({_id: req.params.id}, update, function(err, numAffected) {
			console.log(numAffected);
		});
		res.redirect('/admin/posts');
	});
});

// Delete existing post
router.delete('/posts/:id', ensureAuthenticated, function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/admin/posts');
	})
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = router;
