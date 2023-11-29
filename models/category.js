module.exports = function Category (name) {

    this.name = name;
    this.url = `/products/${name.toLowerCase().split(' ').join('-')}`;
    this.items = [];
    this.subcategories = [];

    return { name, url, items, subcategories };

}
