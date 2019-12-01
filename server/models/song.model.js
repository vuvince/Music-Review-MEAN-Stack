const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SongSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    year: { type: Number, min: 1000, max: 9999 },
    genre: { type: String },
    avg: { type: Number },
    cViolation: { type: Boolean, default: false }
  },
  { collection: "songs" }
);

// Export the model
module.exports = mongoose.model("Song", SongSchema);
