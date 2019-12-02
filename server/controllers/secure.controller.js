// const Secure = require("../models/secure.model");
const Song = require("../models/song.model");
const Review = require("../models/review.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

function encodeHTML(s) {
  if (s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }
}

//POST REQUEST. CODE FROM https://auth0.com/blog/real-world-angular-series-part-5/#L-span-id--api-rsvps----span-API--Create-and-Update-RSVPs
exports.add_review = function(req, res, next) {
  const review = new Review({
    songId: encodeHTML(req.body.songId),
    userId: encodeHTML(req.body.userId),
    name: encodeHTML(req.body.name),
    comments: encodeHTML(req.body.comments),
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
        title: encodeHTML(req.body.title),
        artist: encodeHTML(req.body.artist),
        album: encodeHTML(req.body.album),
        year: req.body.year,
        genre: encodeHTML(req.body.genre),
        avg: req.body.avg
      });
      song.save(err => {
        if (err) {
          return res.status(501).send({ message: err.message });
        }
        res.send(song);
      });
    }
  );
};
