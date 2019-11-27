const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReviewSchema = new Schema(
  {
    songId: { type: String, required: true }, //Must be tied to a song
    userId: { type: String, required: true, max: 100 }, //Must be tied to a user
    name: { type: String },
    comments: { type: String, required: true },
    reviewDate: { type: Date },
    rating: { type: Number, min: 1, max: 5 }
  },
  { collection: "reviews" }
);

// Export the model
module.exports = mongoose.model("Review", ReviewSchema);
