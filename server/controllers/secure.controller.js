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

// controllers/secure.js
//PUT: Create a song and return Id
exports.song_create = function(req, res, next) {
  let song = new Song({
    title: encodeHTML(req.body.title),
    artist: encodeHTML(req.body.artist),
    album: req.body.album,
    year: req.body.year,
    genre: req.body.genre,
    cViolation: req.body.cViolation
  });

  song.save(function(err, doc) {
    if (err) {
      console.log("Error:");
      return next(err);
    }
    res.send(doc);
    //res.send(doc._id);
  });
};

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

//BELOW IS AUTHENTICATION https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8

// //Verify User
// exports.verify_user = function(req, res, next) {
//   //get the token from the header if present
//   const token = req.headers["x-access-token"] || req.headers["authorization"];
//   //if no token found, return response (without going to the next middelware)
//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     //if can verify the token, set req.user and pass to next middleware
//     const decoded = jwt.verify(token, config.get("myprivatekey"));
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     //if invalid token
//     res.status(400).send("Invalid token.");
//   }
// };

// //Get current user
// exports.current_user = function(req, res) {
//   const user = await User.findById(req.user._id).select("-password");
//   res.send(user);
// };

// //Register User
// exports.register_user = function (req, res){

//   // validate the request body first
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   //find an existing user, has to be unique email
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send("User already registered.");

//   user = new User({
//     name: req.body.name,
//     password: req.body.password,
//     email: req.body.email
//   });
//   user.password = await bcrypt.hash(user.password, 10);
//   await user.save();

//   const token = user.generateAuthToken();
//   res.header("x-auth-token", token).send({
//     _id: user._id,
//     name: user.name,
//     email: user.email
//   });
// };
