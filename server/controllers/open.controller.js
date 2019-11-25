// const Open = require("../models/open.model");
const User = require("../models/user.model");
const Song = require("../models/song.model");
const Review = require("../models/review.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

//Return list of all reviews for a song (GET)
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
  User.find({ points: { $exists: true } })
    .sort({ points: -1 })
    .limit(5)
    .toArray();
  Song.find(function(err, songs) {
    if (err) return next(err);

    res.send(songs);
  });
};

//GET all reviews using a product ID a product by its ID
exports.product_details = function(req, res, next) {
  Product.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    res.send(product);
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
