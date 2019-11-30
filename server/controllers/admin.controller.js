const Song = require("../models/song.model");
const Review = require("../models/review.model");
const Policy = require("../models/policy.model");

function encodeHTML(s) {
  if (s.length == 0) {
    return;
  }
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

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

//UPDATING SONG (PUT)
exports.update_song = function(req, res, next) {
  Song.findById(req.params.id, (err, song) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!song) {
      return res.status(400).send({ message: "Song not found." });
    }
    song.title = encodeHTML(req.body.title);
    song.artist = encodeHTML(req.body.artist);
    song.album = encodeHTML(req.body.album);
    song.genre = encodeHTML(req.body.genre);
    song.cViolation = req.body.cViolation;

    song.save(err => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.send(song);
    });
  });
};

//POLICY STUFF BELOW

//PUT: Update a policy by ID
exports.update_policy = function(req, res, next) {
  Policy.findById(req.params.id, (err, policy) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!policy) {
      return res.status(400).send({ message: "Policy not found." });
    }
    policy.name = req.body.name;
    policy.desc = req.body.desc;

    policy.save(err => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.send(policy);
    });
  });
};

//POST: Add policy by id
exports.add_policy = function(req, res, next) {
  const policy = new Policy({
    name: req.body.name,
    desc: req.body.desc
  });
  policy.save(err => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(policy);
  });
};

//DELETE POLICY
exports.delete_policy = function(req, res, next) {
  Policy.findById(req.params.id, (err, policy) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!policy) {
      return res.status(400).send({ message: "Policy not found." });
    }
    policy.remove(err => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Policy successfully deleted." });
    });
  });
};
