// const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const Song = require("../models/song.model");
const Review = require("../models/review.model");
// const _songListProjection = "title artist album cViolation";

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

//RETURNS ALL SONGS
exports.find_all = function(req, res, next) {
  Song.find(function(err, songs) {
    if (err) return next(err);

    res.send(songs);
  });
};

exports.find_all = function(req, res, next) {
  Song.find({}, (err, songs) => {
    let songsArr = [];
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (songs) {
      songs.forEach(song => {
        songsArr.push(song);
      });
    }
    res.send(songsArr);
  });
};
