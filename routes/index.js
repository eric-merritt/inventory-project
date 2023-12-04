var express = require('express');
var router = express.Router();

const inventory_controller = require('../controllers/inventoryController');
const item_controller = require('../controllers/itemController')


// const populateDb = require('../populateDb');
// populateDb();

/* GET home page in list view. */
router.get('/', inventory_controller.list_view);

router.get('/:view_id', inventory_controller.catalog_view);

router.get('/product/:item_id/', item_controller.item_details);

router.get('/product/:item_id/modify', item_controller.modify_item);


module.exports = router;
