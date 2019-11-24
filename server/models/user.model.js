const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    admin: { type: Boolean, required: false },
    access: { type: Boolean, required: false }
  },
  { collection: "users" }
);

// Export the model
module.exports = mongoose.model("User", UserSchema);
