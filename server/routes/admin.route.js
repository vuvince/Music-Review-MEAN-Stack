const express = require("express");
const router = express.Router();

// Require the controllers
const admin_controller = require("../controllers/admin.controller");
const api_controller = require("../controllers/api.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get(
  "/test",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  admin_controller.test
);

// FUNCTIONALITIES
// Special user with site manager access. {4 points}💗
// Ability to grant site manager privilege to one or more existing users: {2 points}
// Ability to mark a song as hidden and clear the “hidden” flag if set:  {2 points}
// Ability to mark a user as “deactivated” and mark as “active” if deactivated: {2 points}

//Returns all songs (even hidden)
router.get(
  "/song/all",
  api_controller.jwtCheck,
  api_controller.adminCheck,
  admin_controller.find_all
);

// DELETE a song
router.delete(
  "/song/delete/:id",
  api_controller.jwtCheck,
  api_controller.adminCheck,
  admin_controller.delete_song
);

//PUT Update a song
router.put(
  "/song/update/:id",
  api_controller.jwtCheck,
  api_controller.adminCheck,
  admin_controller.update_song
);

//Update Policy
router.put(
  "/policy/update/:id",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  admin_controller.update_policy
);

//POST Add new policy
router.post(
  "/policy/new",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  admin_controller.add_policy
);

//Delete polity
router.delete(
  "/policy/delete/:id",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  admin_controller.delete_policy
);

//Update dmca
router.put(
  "/dmca/update/:id",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  admin_controller.update_dmca
);

//POST Add new dmca
router.post(
  "/dmca/new",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  admin_controller.add_dmca
);

//Delete dmca
router.delete(
  "/dmca/delete/:id",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  admin_controller.delete_dmca
);

//Find all dmca
router.get(
  "/dmca",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  open_controller.find_all
);

//Details of one dmca
router.get(
  "/dmca/:id",
  // api_controller.jwtCheck,
  // api_controller.adminCheck,
  open_controller.dmca_details
);

//Export router
module.exports = router;
