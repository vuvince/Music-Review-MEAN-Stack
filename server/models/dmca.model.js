const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DmcaSchema = new Schema(
  {
    email: { type: String, required: true },
    songId: { type: String, required: true },
    songTitle: { type: String, required: true },
    dReqRec: { type: Date }, //Date request received
    dNoticeSent: { type: Date }, //Date notice sent
    dDispRec: { type: Date } //Date dispute received
  },
  { collection: "dmca" }
);

// Export the model
module.exports = mongoose.model("Dmca", DmcaSchema);
