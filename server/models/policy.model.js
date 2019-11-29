const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PolicySchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true }
  },
  { collection: "policy" }
);

// Export the model
module.exports = mongoose.model("Policy", PolicySchema);
