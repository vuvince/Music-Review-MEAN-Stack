const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SongSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    year: { type: Number },
    genre: { type: String },
    cViolation: { type: Boolean, default: false }
  },
  { collection: "songs" }
);

// Export the model
module.exports = mongoose.model("Song", SongSchema);
