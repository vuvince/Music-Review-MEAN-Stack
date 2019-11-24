const express = require("express");
const router = express.Router();

// Require the controllers
const product_controller = require("../controllers/product.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", product_controller.test);

//Find all items
router.get("/find_all", product_controller.find_all);

//create collection to be added to database
router.post("/create", product_controller.product_create);

//read existing product
router.get("/:id", product_controller.product_details);

//update existing product
router.put("/update/:id", product_controller.product_update);

//delete item
router.delete("/delete/:id", product_controller.product_delete);

//Export router
module.exports = router;
