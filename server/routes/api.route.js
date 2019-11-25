const express = require("express");
const router = express.Router();

// Require the controllers
const api_controller = require("../controllers/api.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/", api_controller.test);

module.exports = router;
