//Authentication code from https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8

const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user.model");
const express = require("express");
const router = express.Router();

//Returns the current user
router.get("/current");

//Create a User
// router.post("/", auth_controller.register_user);

module.exports = router;
