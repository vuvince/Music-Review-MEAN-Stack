const Song = require("../models/song.model");
const Review = require("../models/review.model");
const Policy = require("../models/policy.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

//Retrieving (getting) a song by its Id
exports.song_details = function(req, res, next) {
  Song.findById(req.params.id, function(err, song) {
    if (err) return next(err);
    res.send(song);
  });
};

//Export only available songs
//RETURN TOP 10 SONGS
exports.available_songs = async function(req, res, next) {
  const songsArr = await Song.find({ cViolation: false });
  if (!songsArr) {
    return res.status(400).send({ message: "No songs found." });
  }
  var i = 0;
  for (song of songsArr) {
    const reviews = await Review.find({ songId: song._id });
    var sum = 0;
    var count = 0;
    for (review of reviews) {
      sum += review.rating;
      count++;
    }
    var avg = sum / count;
    if (!(avg >= 1) || !(avg <= 5)) {
      avg = 0;
    }

    songsArr[i]["avg"] = avg;
    i++;
  }
  var sorted = songsArr.sort(function review(a, b) {
    return b.avg < a.avg ? -1 : b.avg > a.avg ? 1 : 0;
  });

  res.send(sorted);
};

//RETURN TOP 10 SONGS
exports.top10 = async function(req, res, next) {
  const songsArr = await Song.find({ cViolation: false });
  if (!songsArr) {
    return res.status(400).send({ message: "No songs found." });
  }
  var i = 0;
  for (song of songsArr) {
    const reviews = await Review.find({ songId: song._id });
    if (!reviews) {
      res.send(songsArr);
    }
    var sum = 0;
    var count = 0;
    for (review of reviews) {
      sum += review.rating;
      count++;
    }
    var avg = sum / count;
    if (!(avg >= 1) || !(avg <= 5)) {
      avg = 0;
    }

    songsArr[i]["avg"] = avg;
    i++;
  }
  var sorted = songsArr.sort(function review(a, b) {
    return b.avg < a.avg ? -1 : b.avg > a.avg ? 1 : 0;
  });

  var final = sorted.slice(0, 10);
  res.send(final);
};

//Return list of all reviews for a song (GET) (WORKS)
exports.song_reviews = function(req, res) {
  Review.find({ songId: req.params.id }, (err, reviews) => {
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

//POLICY STUFF BELOW
//GET: Retrieve a single policy by ID
exports.policy_details = function(req, res, next) {
  Policy.findById(req.params.id, function(err, policy) {
    if (err) return next(err);
    res.send(policy);
  });
};

//Find all policys
exports.find_all = function(req, res, next) {
  Policy.find({}, (err, policys) => {
    let policysArr = [];
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (policys) {
      policys.forEach(policy => {
        policysArr.push(policy);
      });
    }
    res.send(policysArr);
  });
};
