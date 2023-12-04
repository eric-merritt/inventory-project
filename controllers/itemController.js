const asyncHandler = require('express-async-handler');
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
let client = new MongoClient(uri);
var ObjectId = require('mongodb').ObjectId;


exports.item_details = asyncHandler(async (req, res, next) => {

	try {

		let db = client.db('inventory');
		let query = { _id: new ObjectId(req.params.item_id) };  

		item = await db.collection('items').findOne(query);
		categories = await db.collection('categories').find().toArray();
		
		res.render('item', { title: 'Electrical Supply Co. - Inventory Portal', categories: categories, item: item })

	} catch (err) {

		console.log(err);

	} 

});

exports.modify_item = asyncHandler(async (req, res, next) => {

	try {

		let db = client.db('inventory');
		let query = { _id: new ObjectId(req.params.item_id) };  

		item = await db.collection('items').findOne(query);
		categories = await db.collection('categories').find().toArray();
		
		res.render('itemModify', { title: 'Electrical Supply Co. - Inventory Portal', categories: categories, item: item })

	} catch (err) {

		console.log(err);
		
	} 

})