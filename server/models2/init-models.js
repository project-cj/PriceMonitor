var DataTypes = require("sequelize").DataTypes;
var _brand = require("./brand");
var _category = require("./category");
var _city = require("./city");
var _country = require("./country");
var _currency = require("./currency");
var _price_read = require("./price_read");
var _product = require("./product");
var _shop = require("./shop");
var _shop_has_product = require("./shop_has_product");
var _shopapp = require("./shopapp");
var _shoppinglist = require("./shoppinglist");
var _shoppinglist_has_product = require("./shoppinglist_has_product");
var _street = require("./street");
var _subcategory = require("./subcategory");
var _user = require("./user");
var _voivodeship = require("./voivodeship");

function initModels(sequelize) {
  var brand = _brand(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var country = _country(sequelize, DataTypes);
  var currency = _currency(sequelize, DataTypes);
  var price_read = _price_read(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var shop = _shop(sequelize, DataTypes);
  var shop_has_product = _shop_has_product(sequelize, DataTypes);
  var shopapp = _shopapp(sequelize, DataTypes);
  var shoppinglist = _shoppinglist(sequelize, DataTypes);
  var shoppinglist_has_product = _shoppinglist_has_product(sequelize, DataTypes);
  var street = _street(sequelize, DataTypes);
  var subcategory = _subcategory(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var voivodeship = _voivodeship(sequelize, DataTypes);

  product.belongsTo(brand, { as: "Brand", foreignKey: "Brand_id"});
  brand.hasMany(product, { as: "products", foreignKey: "Brand_id"});
  subcategory.belongsTo(category, { as: "Category", foreignKey: "Category_id"});
  category.hasMany(subcategory, { as: "subcategories", foreignKey: "Category_id"});
  street.belongsTo(city, { as: "City", foreignKey: "City_id"});
  city.hasMany(street, { as: "streets", foreignKey: "City_id"});
  voivodeship.belongsTo(country, { as: "Country", foreignKey: "Country_id"});
  country.hasMany(voivodeship, { as: "voivodeships", foreignKey: "Country_id"});
  price_read.belongsTo(currency, { as: "Currency", foreignKey: "Currency_id"});
  currency.hasMany(price_read, { as: "price_reads", foreignKey: "Currency_id"});
  shop_has_product.belongsTo(product, { as: "Product", foreignKey: "Product_id"});
  product.hasMany(shop_has_product, { as: "shop_has_products", foreignKey: "Product_id"});
  shoppinglist_has_product.belongsTo(product, { as: "Product", foreignKey: "Product_id"});
  product.hasMany(shoppinglist_has_product, { as: "shoppinglist_has_products", foreignKey: "Product_id"});
  shop_has_product.belongsTo(shop, { as: "Shop", foreignKey: "Shop_id"});
  shop.hasMany(shop_has_product, { as: "shop_has_products", foreignKey: "Shop_id"});
  price_read.belongsTo(shop_has_product, { as: "Shop_has_Product", foreignKey: "Shop_has_Product_id"});
  shop_has_product.hasMany(price_read, { as: "price_reads", foreignKey: "Shop_has_Product_id"});
  shoppinglist_has_product.belongsTo(shoppinglist, { as: "ShoppingList", foreignKey: "ShoppingList_id"});
  shoppinglist.hasMany(shoppinglist_has_product, { as: "shoppinglist_has_products", foreignKey: "ShoppingList_id"});
  shop.belongsTo(street, { as: "Street", foreignKey: "Street_id"});
  street.hasMany(shop, { as: "shops", foreignKey: "Street_id"});
  product.belongsTo(subcategory, { as: "Subcategory", foreignKey: "Subcategory_id"});
  subcategory.hasMany(product, { as: "products", foreignKey: "Subcategory_id"});
  price_read.belongsTo(user, { as: "User", foreignKey: "User_id"});
  user.hasMany(price_read, { as: "price_reads", foreignKey: "User_id"});
  shoppinglist.belongsTo(user, { as: "User", foreignKey: "User_id"});
  user.hasMany(shoppinglist, { as: "shoppinglists", foreignKey: "User_id"});
  city.belongsTo(voivodeship, { as: "Voivodeship", foreignKey: "Voivodeship_id"});
  voivodeship.hasMany(city, { as: "cities", foreignKey: "Voivodeship_id"});

  return {
    brand,
    category,
    city,
    country,
    currency,
    price_read,
    product,
    shop,
    shop_has_product,
    shopapp,
    shoppinglist,
    shoppinglist_has_product,
    street,
    subcategory,
    user,
    voivodeship,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
