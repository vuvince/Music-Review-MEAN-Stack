const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SongSchema = new Schema(
  {
    title: { type: String, required: true, max: 100 },
    artist: { type: String, required: true, max: 100 },
    cViolation: { type: Boolean, default: false }
  },
  { collection: "songs" }
);

// Export the model
module.exports = mongoose.model("Song", SongSchema);
