
module.exports = function Item (item) {

	// catalog # (string)
	this.catno = item.catno;
	// description (string)
	this.desc = item.desc;
	// manufacturer
	this.mfr = item.mfr;
	// quantity (object w/ qty.stock, onOrder, allocated, available)
	this.qty = item.qty;
	// purchase cost (number)
	this.cost = item.cost;
	// default margin (number)
	this.defMgn = item.defMgn;
	// array of categories 
	this.categories = item.categories;
	// array of transactions
	this.transactions = item.transactions;
	// url (string)
	this.url = `/products/${item.catno.toLowerCase()}`;
	// unit of measure for cost
	this.uom = item.uom;

	return { catno, desc, mfr, qty, cost, defMgn, categories, transactions, url, uom };

}




