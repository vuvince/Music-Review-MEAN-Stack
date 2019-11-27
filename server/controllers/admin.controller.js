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
// exports.find_all = function(req, res, next) {
//   Song.find(function(err, songs) {
//     if (err) return next(err);

//     res.send(songs);
//   });
// };

//Find all songs
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

//DELETE SONG AND ALL ASSOCIATE REVIEWS
exports.delete_song = function(req, res, next) {
  Song.findById(req.params.id, (err, song) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!song) {
      return res.status(400).send({ message: "Song not found." });
    }
    Review.find({ songId: req.params.id }, (err, reviews) => {
      if (reviews) {
        reviews.forEach(review => {
          review.remove();
        });
      }
      song.remove(err => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res
          .status(200)
          .send({ message: "Song and RSVPs successfully deleted." });
      });
    });
  });
};
