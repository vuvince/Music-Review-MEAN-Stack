const express = require("express");
const router = express.Router();

// Require the controllers
const admin_controller = require("../controllers/admin.controller");
const api_controller = require("../controllers/api.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get(
  "/test",
  api_controller.jwtCheck,
  api_controller.adminCheck,
  admin_controller.test
);

// FUNCTIONALITIES
// Special user with site manager access. {4 points}💗
// Ability to grant site manager privilege to one or more existing users: {2 points}
// Ability to mark a song as hidden and clear the “hidden” flag if set:  {2 points}
// Ability to mark a user as “deactivated” and mark as “active” if deactivated: {2 points}

//Returns all songs
// a simple test url to check that all of our files are communicating correctly.
router.get(
  "/song/all",
  api_controller.jwtCheck,
  api_controller.adminCheck,
  admin_controller.find_all
);

//Export router
module.exports = router;
