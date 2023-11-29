const Products = require('../controllers/productController');

var express = require('express');
var router = express.Router();


// const populateDb = require('../populateDb');
// populateDb();

/* GET home page. */
router.get('/', Products.index );


module.exports = router;
