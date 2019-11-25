const express = require("express");
const router = express.Router();

// Require the controllers
const admin_controller = require("../controllers/admin.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", admin_controller.test);

//Export router
module.exports = router;
