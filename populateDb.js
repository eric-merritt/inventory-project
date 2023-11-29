const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


const database = client.db('inventory');
const itemsColl = database.collection('items');
const categoriesColl = database.collection('categories');

 
async function clearDatabase () {


  try {

    const result = await itemsColl.deleteMany( { mfr: { $ne: 'Sample Corporation' } } );
      console.log(`Success: ${result.deletedCount} documents were deleted from database.`);
    
    
  } finally {
      
    const result2 = await categoriesColl.deleteMany( { name: { $ne: 'Test' } } );
      console.log(`Success: ${result2.deletedCount} documents deleted.`);

      console.log(`Success: Database cleared!`);
  }

}


// importing schemas for use with prepopulating DB
const Category = require('./models/category');
const Item = require('./models/item');
const { format } = require('morgan');


// initializing arrays to keep products and categories in as I create them.
// allows for easier manipulation before committing to the database
const items = [];
const categories = [];

const conduit = Category('Conduit');
	conduit.subcategories = ['EMT', 'PVC'];

const conduitFittings = Category('Conduit Fittings');
	conduitFittings.subcategories = ['Couplings', 'Connectors'];

	categories.push(conduit);
	categories.push(conduitFittings);


const conduitSizes = [ '.50', '.75', '1.00', '1.25', '1.50', '2.00', '2.50', '3.00', '3.50', '4.00' ];


for (let i = 0; i < conduitSizes.length; i++ ) {

  let stockQty = Math.floor(Math.random() * 99) * 100;
  let allocQty = Math.floor(Math.random() * 19) * 100; 

  const emt = Item({
    catno: conduitSizes[i] + '-EMT',
    desc:  conduitSizes[i] + `-EMT - ${conduitSizes[i]}" x 10FT EMT`,
    mfr: 'Wheatland Tube',
    qty: {
      stock: stockQty,
      onOrder: 200,
      alloc: allocQty,
      avail: stockQty - allocQty
    },
    cost: conduitSizes[i] * 100,
    defMgn: .121,
    categories: ['Conduit', 'EMT'],
    transactions: [],
    uom: 'c'
  })

  conduit.items.push(emt.catno);

  const pvc = Item({
    catno: conduitSizes[i] + '-PVC',
    desc:  conduitSizes[i] + `-PVC - ${conduitSizes[i]}" x 10FT PVC`,
    mfr: 'Wheatland Tube',
    qty: {
      stock: stockQty,
      onOrder: 200,
      alloc: allocQty,
      avail: stockQty - allocQty
    },
    cost: conduitSizes[i] * 100,
    defMgn: .121,
    categories: ['Conduit', 'PVC'],
    transactions: [],
    uom: 'c'
  })

  conduit.items.push(pvc.catno);

	j = 121 + i;

	stockQty = stockQty / 10;
	allocQty = allocQty / 10;

	const coupling = Item({
		catno: 'TK' + j + 'A',
    desc:  'TK' + j + `A - ${conduitSizes[i]}" EMT Set-Screw Coupling`,
    mfr: 'ABB',
    qty: {
      stock: stockQty,
      onOrder: 200,
      alloc: allocQty,
      avail: stockQty - allocQty
    },
    cost: conduitSizes[i] < 2 ? conduitSizes[i] * 1 : conduitSizes[i] * 4,
    defMgn: .275,
    categories: ['Conduit Fittings'],
    transactions: [],
    uom: 'c'
  })

  conduitFittings.items.push(coupling.catno)

	const connector = Item({
		catno: 'TC' + j + 'A',
    desc:  'TC' + j + `A - ${conduitSizes[i]}" EMT Set-Screw Connector`,
    mfr: 'ABB',
    qty: {
      stock: stockQty,
      onOrder: 200,
      alloc: allocQty,
      avail: stockQty - allocQty
    },
    cost: conduitSizes[i] < 2 ? conduitSizes[i] * 1 : conduitSizes[i] * 4,
    defMgn: .275,
    categories: ['Conduit Fittings'],
    transactions: [],
    uom: 'c'
  })

    conduitFittings.items.push(connector.catno);

  items.push(emt);
  items.push(pvc);
	items.push(coupling);
	items.push(connector);

}
 

async function buildDatabase () {

		const result = await itemsColl.insertMany(items);
		  console.log(`Success: ${result.insertedCount} documents added to the items collection.`);

    const result2 = await categoriesColl.insertMany(categories);
      console.log(`Success: ${result2.insertedCount} documents added to the categories collection.`);

  };


  
		// 		const result = await categoryColl.updateOne(
		// 			{ name: category },
		// 			{ $push: { items: { $each: Array.from(categoryMatches) }}}
		// 		)
        
		//     console.log('Success: Item references nested in categories documents.')

		// }

module.exports = async function populateDb() {
try {
  await clearDatabase();
  await buildDatabase();

    // console.log(`Success: ${result3.insertedCount} documents added to categories collection.`)


} catch(err) {

  console.dir(err);

} finally {

  await client.close();

}

};

