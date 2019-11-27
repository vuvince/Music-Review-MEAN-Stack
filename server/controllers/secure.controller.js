//CONFIGURATION
const jwt = require("jsonwebtoken");
const config = require("config");

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

//POST REQUEST. CODE FROM https://auth0.com/blog/real-world-angular-series-part-5/#L-span-id--api-rsvps----span-API--Create-and-Update-RSVPs
exports.add_review = function(req, res, next) {
  const review = new Review({
    songId: req.body.songId,
    userId: req.body.userId,
    name: req.body.name,
    comments: req.body.comments,
    reviewDate: req.body.reviewDate,
    rating: req.body.rating
  });
  review.save(err => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(review);
  });
};

//POST new song
exports.create_song = function(req, res, next) {
  Song.findOne(
    {
      title: req.body.title
    },
    (err, existingSong) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (existingSong) {
        return res.status(409).send({
          message: "A song with this title already exists"
        });
      }
      const song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        genre: req.body.genre,
        cViolation: req.body.cViolation
      });
      song.save(err => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.send(song);
      });
    }
  );
};

// controllers/secure.js
//PUT: Create a song and return Id (MY VERSION)
// exports.song_create = function(req, res, next) {
//   let song = new Song({
//     title: encodeHTML(req.body.title),
//     artist: encodeHTML(req.body.artist),
//     album: req.body.album,
//     year: req.body.year,
//     genre: req.body.genre,
//     cViolation: req.body.cViolation
//   });

//   song.save(function(err, doc) {
//     if (err) {
//       console.log("Error:");
//       return next(err);
//     }
//     res.send(doc);
//     //res.send(doc._id);
//   });
// };

//POST: Updating Song by Id
exports.song_update = function(req, res) {
  Song.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, doc) {
    if (err) return next(err);
    res.send("Updated Succesfully!");
  });
};

//PUT: Add a review for the song with the given Id
exports.review_create = function(req, res, next) {
  let review = new Review({
    songId: req.params.id,
    userId: encodeHTML(req.body.userId),
    rBody: encodeHTML(req.body.rBody),
    rating: req.body.rating
  });
  review.save(function(err, doc) {
    if (err) {
      console.log("Error:");
      return next(err);
    }
    res.send(doc);
  });
};
