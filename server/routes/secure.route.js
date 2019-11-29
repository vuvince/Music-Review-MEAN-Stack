const express = require("express");
const router = express.Router();

// Require the controllers
const secure_controller = require("../controllers/secure.controller");
const api_controller = require("../controllers/api.controller");

//API TEST
router.get("/apiTest", api_controller.test);

// POST a new song
router.post(
  "/song/new",
  api_controller.jwtCheck,
  secure_controller.create_song
);

//POST based on tutorial (ADD JWT CHECK)
router.post(
  "/review/new",
  api_controller.jwtCheck,
  secure_controller.add_review
);

//Export router
module.exports = router;
