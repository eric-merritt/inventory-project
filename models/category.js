module.exports = function Category (name) {

    this.name = name;
    this.url = `/products/${name}`;
    this.items = [];
    this.subcategories = [];

    return { name, url, items, subcategories };

}
