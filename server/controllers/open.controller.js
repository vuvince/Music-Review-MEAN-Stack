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

//Return Top 10 songs
exports.top10 = function(req, res, next) {
  //LOOK FOR ALL SONGS WITHOUT COPYRIGHT VIOLATIONS
  Song.find({ cViolation: false }, (err, songs) => {
    let songArr = []; // Going to order top 10 songs
    let rankingArr = []; //used to get an array of the ratings
    let top10Arr = []; //final array to send
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
        var averageRating = 0;
        var numReview = 0; // Can use as the other parameter
        //Finding array of reviews for each song
        Review.find({ songId: song.id }, (err, reviews) => {
          //Song has reviews
          if (reviews) {
            //Find average rating
            reviews.forEach(review => {
              averageRating += review.rating;
            });
            averageRating = averageRating / reviews.length;
            numReview = reviews.length;
          }
        });
        rankingArr.push(averageRating); //Get an array
        songArr.push(song);
        //END OF LOOP FOR SONGS
      });
      //Call function that will sort the arrays now that average rating for each song calculated
      songArr = doubleSort(rankingArr, songArr);
      //ONLY 10
      for (i = 0; i < 10; i++) {
        rankingArr.push(songArr[i]);
      }
    }
    res.send(songArr);
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
