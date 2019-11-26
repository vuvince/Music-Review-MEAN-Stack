const express = require("express");
const router = express.Router();

// Require the controllers
const secure_controller = require("../controllers/secure.controller");
const auth_controller = require("../controllers/auth.controller"); //OUTDATED, NOT USING
const api_controller = require("../controllers/api.controller");

//FUNCTIONALITIES FOR SECURE
// Add a review to a song. {4 points} 💗
// Add a rating (1-5, star etc) to reviews created by the user.  {2 points} 💗
// Add a new song to the site. {4 points}💗
// Support storing all ID3v1 attributes for each new song. {4 points}💗
// Enforce required attributes “title” and “artist” when adding a new song. {2 points}
// Add a review while adding a new song if necessary. {2 points}

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", auth_controller.verifyToken, secure_controller.test);

//API TEST
router.get("/apiTest", api_controller.test);

//Create song (PUT)
router.put("/song", api_controller.jwtCheck, secure_controller.song_create);

//Update song by id (POST)
router.post(
  "/song/:id",
  api_controller.jwtCheck,
  secure_controller.song_update
);

//Add a review using the songs ID
router.put(
  "/add-review/:id",
  api_controller.jwtCheck,
  secure_controller.review_create
);

//Export router
module.exports = router;
