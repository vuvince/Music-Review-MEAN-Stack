//FOR UNAUTHENTICATED USERS

const express = require("express");
const router = express.Router();

const open_controller = require("../controllers/open.controller");
//FUNCTIONALITIES REQUIRED
// Start page showing application name, a short “about” blurb that says what the site offers, and login button. {2 points}💗
// List of songs (up to 10) ordered by popularity (e.g. number of users who reviewed that song or average rating). Any sensible criteria of popularity is acceptable. {4 points}💗
// Ability to search songs based on keywords. {6 points}💗
router.get("/search", open_controller.search_song);

// Keywords are matched with all attributes of the item (see ID3v1 below). {2 points} 💗
// Keywords are soft-matched (e.g ignore differences in case, white-space, minor spelling variations). {2 points}
// Ability to view all information on a song by clicking or expanding (shows all attributes, most recent review, the number of reviews and the average rating. {4 points}💗

// Ability to view all reviews for a song: {2 points} (WORKS)
router.get("/reviews/:id", open_controller.song_reviews);

// Each review shows the rating, the review and reviewer’s username: {2 points}

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", open_controller.test);

//FIND ALL NON-COPYRIGHTED SONGS
router.get("/song/available", open_controller.available_songs);

//Export router
module.exports = router;
