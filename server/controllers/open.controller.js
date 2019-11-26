// const Open = require("../models/open.model");
const User = require("../models/user.model");
const Song = require("../models/song.model");
const Review = require("../models/review.model");

// const _songListProjection = "title artist album cViolation";

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

//Retrieving (getting) a song by its ID
exports.song_details = function(req, res, next) {
  Song.findById(req.params.id, function(err, song) {
    if (err) return next(err);
    res.send(song);
  });
};

//Export only available songs
exports.available_songs = function(req, res, next) {
  Song.find({ cViolation: false }, function(err, songs) {
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

//Return list of all reviews for a song (GET) (WORKS)
exports.song_reviews = function(req, res) {
  Review.find({ eventId: req.params.eventId }, (err, reviews) => {
    let reviewsArr = [];
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (reviews) {
      reviews.forEach(review => {
        reviewsArr.push(review);
      });
    }
    res.send(reviewsArr);
  });
};

//Search song
// EXAMPLE URL https://stackabuse.com/?page=2&limit=3
exports.search_song = function(req, res) {
  let title = req.query.title;
  let artist = req.query.artist;
  let album = req.query.album;
  let year = req.query.year;
  let genre = req.query.genre;

  var query = {};
  if (title) {
    query.title = title;
  }
  if (artist) {
    query.artist = artist;
  }
  if (album) {
    query.album = album;
  }
  if (year) {
    query.year = year;
  }
  if (genre) {
    query.genre = genre;
  }

  Song.find(query, (err, songs) => {
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

//Return list of all songs (GET)
exports.find_all_songs = function(req, res, next) {
  console.log("Get All Songs works");
  Song.find(function(err, songs) {
    if (err) return next(err);

    res.send(songs);
  });
};

//Return Top 10 songs
exports.top10songs = function(req, res, next) {
  console.log("Get All Songs works");
  Song.find(function(err, songs) {
    if (err) return next(err);

    //Array of songs
    res.send(songs);
  });
};

//Return reviews
exports.find_all_songs = function(req, res, next) {
  console.log("Get All Songs works");
  Review.find({ songID: req.params.id }, function(err, reviews) {
    if (err) return next(err);
    res.send(reviews);
  });
};
