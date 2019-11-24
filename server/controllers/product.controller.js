const Product = require("../models/product.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

//HTML Sanitization
function encodeHTML(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

exports.find_all = function(req, res, next) {
  Product.find(function(err, product) {
    if (err) return next(err);

    res.send(product);
  });
};

// controllers/products.js
//CREATING A PRODUCT
exports.product_create = function(req, res, next) {
  let product = new Product({
    name: encodeHTML(req.body.name),
    itemType: req.body.itemType,
    loanPeriod: req.body.loanPeriod,
    quantity: req.body.quantity
  });
  product.save(function(err) {
    if (err) {
      console.log("Error:");
      return next(err);
    }
    res.send("Product Created successfully");
  });
};

//Retrieving (getting) a product by its ID
exports.product_details = function(req, res, next) {
  Product.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

//Updating Product(must be PUT request)
exports.product_update = function(req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    product
  ) {
    if (err) return next(err);
    res.send("Product udpated.");
  });
};

//Deleting a product (must be DELETE request )
exports.product_delete = function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
