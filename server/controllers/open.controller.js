// const Open = require("../models/open.model");
const User = require("../models/user.model");
const Song = require("../models/song.model");
const Review = require("../models/review.model");

// const _songListProjection = "title artist album cViolation";

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

//Return Top 10 songs (DOES NOT WORK)
exports.top10 = function(req, res, next) {
  //LOOK FOR ALL SONGS WITHOUT COPYRIGHT VIOLATIONS
  Song.find({ cViolation: false }, (err, songs) => {
    var songsArr = [];
    var rankingArr = [];
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!songs) {
      return res.status(400).send({ message: "No songs found." });
    }
    //Loop through songs
    if (songs) {
      //Loop EVERY SINGLE SONG
      songs.forEach(song => {
        songsArr.push(song);
        //Finding array of reviews for each song
        Review.find({ songId: song._id }, (err, reviews) => {
          let reviewsArr = [];
          let rankedSongs = [];
          //Handle error event
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          if (reviews) {
            reviews.forEach(review => {
              //Get array of ratings
              reviewsArr.push(review.rating);
            });
          }
          //Reviews array complete here for each individual song
          let sum = reviewsArr.reduce(
            (previous, current) => (current += previous)
          );
          let avg = sum / reviewsArr.length;
          reviewsArr.push(avg);
          rankingArr.push(avg);
          rankedSongs.push(song);
          // res.send(rankedSongs);
        });
        res.send(rankedSongs);
      });
      //Song Array
    }
    //Send response song array here
    // res.send(songsArr);
  });
};

//Sort based on ranking array
function doubleSort(rankingArr, objArr) {
  for (i = rankingArr.length - 1; i >= 0; i--) {
    for (j = 1; j <= i; j++) {
      if (rankingArr[j - 1] > rankingArr[j]) {
        let temp1 = rankingArr[j - 1];
        rankingArr[j - 1] = rankingArr[j];
        rankingArr[j] = temp1;
        let temp2 = objArr[j - 1];
        objArr[j - 1] = objArr[j];
        objArr[j] = temp2;
      }
    }
  }
  objArr.reverse();
  return objArr;
}

//Return reviews
exports.find_all_songs = function(req, res, next) {
  console.log("Get All Songs works");
  Review.find({ songId: req.params.id }, function(err, reviews) {
    if (err) return next(err);
    res.send(reviews);
  });
};
