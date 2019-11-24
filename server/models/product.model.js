const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  itemType: { type: String, required: true },
  loanPeriod: { type: Number, required: false },
  quantity: { type: Number }
});

// Export the model
module.exports = mongoose.model("Product", ProductSchema);
