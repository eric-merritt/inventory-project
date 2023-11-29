var express = require('express');
var router = express.Router();

// const populateDb = require('../populateDb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'} );
  // populateDb();

});

module.exports = router;
