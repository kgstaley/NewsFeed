const Temp = require("./temp");

const ProductDimensions = require("./products/dimensions");
const Ratings = require("./ratings");
const Product = require("./products");
const Discount = require("./products/discounts");
const Order = require("./orders");

const Schemas = {
  Order,
  Temp,
  Ratings,
  Product,
  Discount,
  ProductDimensions
};

module.exports = Schemas;
