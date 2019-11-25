const express = require("express");
const router = express.Router();

// Require the controllers
const secure_controller = require("../controllers/secure.controller");
const auth_controller = require("../controllers/auth.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", auth_controller.verifyToken, secure_controller.test);

//Create song (PUT)
router.put("/song", secure_controller.song_create);

//Update song by id (POST)
router.post("/song/:id", secure_controller.song_update);

//Add a review using the songs ID
router.put("/add-review/:id", secure_controller.review_create);

//Export router
module.exports = router;
