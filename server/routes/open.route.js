//FOR UNAUTHENTICATED USERS

const express = require("express");
const router = express.Router();

// Require the controllers
const open_controller = require("../controllers/open.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", open_controller.test);

//Export router
module.exports = router;
