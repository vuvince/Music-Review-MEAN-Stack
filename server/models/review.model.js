const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReviewSchema = new Schema(
  {
    songID: { type: String, required: true }, //Must be tied to a song
    userID: { type: String, required: true, max: 100 }, //Must be tied to a user
    rBody: { type: String, required: true, max: 1000 },
    rating: { type: Number, min: 1, max: 5 }
  },
  { collection: "reviews" }
);

// Export the model
module.exports = mongoose.model("Review", ReviewSchema);
