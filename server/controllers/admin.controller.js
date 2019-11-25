// const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const Song = require("../models/song.model");
const Review = require("../models/review.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};
