// const Secure = require("../models/secure.model");
const User = require("../models/user.model");
const Song = require("../models/song.model");
const Review = require("../models/review.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

function encodeHTML(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

// controllers/secure.js
//PUT: Create a song and return ID
exports.song_create = function(req, res, next) {
  let song = new Song({
    title: encodeHTML(req.body.title),
    artist: req.body.artist
  });
  song.save(function(err, doc) {
    if (err) {
      console.log("Error:");
      return next(err);
    }
    res.send(doc._id);
  });
};

//POST: Updating Song by ID
exports.song_update = function(req, res) {
  Song.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, doc) {
    if (err) return next(err);
    res.send(doc);
  });
};

//PUT: Add a review for the song with the given ID
exports.review_create = function(req, res, next) {
  let review = new Review({
    rBody: encodeHTML(req.body.rBody),
    userEmail: encodeHTML(req.body.userEmail),
    songID: req.params.id
  });
  review.save(function(err, doc) {
    if (err) {
      console.log("Error:");
      return next(err);
    }
    res.send(doc);
  });
};