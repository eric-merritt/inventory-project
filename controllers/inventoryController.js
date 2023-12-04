const asyncHandler = require('express-async-handler');
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
let client = new MongoClient(uri);

exports.list_view = asyncHandler(async (req, res, next) => {

    try {
        
        let db = client.db('inventory');

        let sort = { catno: 1 };

        const [ categories, items ] = await Promise.all([
            await db.collection('categories').find({}).toArray(),
            await db.collection('items').find({}).sort(sort).toArray(),
        ]);
        
        res.render('index', { title: 'Electrical Supply Co. - Inventory Portal', categories: categories, items: items, currentView: 'list' })

    } catch (err) {

        console.log(err)
    
    } 

});

exports.catalog_view = asyncHandler( async function (req, res, next) {

    try {

    if (req.params.view_id !== 'catalog_view') return next();

    let db = client.db('inventory');

    const [ categories, items ] = await Promise.all([
        db.collection('categories').find({}).toArray(),
        db.collection('items').find({}).toArray(),
    ]);

    res.render('catalog', { title: 'Electrical Supply Co. - Catalog View', categories: categories, items: items, currentView: 'catalog' });

} catch (err) {

    console.log(err)

} 

});