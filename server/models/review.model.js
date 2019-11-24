const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReviewSchema = new Schema(
  {
    body: { type: String, required: true, max: 1000 },
    userEmail: { type: String, required: true, max: 100 }, //Must be tied to a user
    songTitle: { type: String, required: true, max: 100 } //Must be tied to a song
  },
  { collection: "reviews" }
);

// Export the model
module.exports = mongoose.model("Review", ReviewSchema);
