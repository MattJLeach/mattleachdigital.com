var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Matt Leach',
  	subTitle: 'Musings of a Javascript developer'
  });
});

module.exports = router;
