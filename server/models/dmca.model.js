const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DmcaSchema = new Schema(
  {
    email: { type: String, required: true },
    who: { type: String, required: false },
    what: { type: String, required: false },
    where: { type: String, required: false }
  },
  { collection: "dmca" }
);

// Export the model
module.exports = mongoose.model("Dmca", DmcaSchema);
