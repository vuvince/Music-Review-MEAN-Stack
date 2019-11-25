const express = require("express");
const router = express.Router();

// Require the controllers
const secure_controller = require("../controllers/secure.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", secure_controller.test);

//Create song
router.put("/song", secure_controller.song_create);

//Export router
module.exports = router;
