const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db('inventory');
const itemColl = database.collection('items');
const categoryColl = database.collection('categories');


    const [ categories, items ] = await Promise.all([
        await categoryColl.find().toArray(),
        await itemColl.find().toArray(),
        await client.close(),
    ]);

    res.render('index', { title: 'Electrical Supply Co. - Inventory Portal', categories: categories, items: items })

})