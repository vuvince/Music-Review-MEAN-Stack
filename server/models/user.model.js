const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    admin: { type: Boolean, required: false },
    access: { type: Boolean, required: false, default: false }, //IF AN ACCOUNT IS AN ADMIN
    active: { type: Boolean, default: true } //IF AN ACCOUNT IS ACTIVE OR NOT
  },
  { collection: "users" }
);

// Export the model
module.exports = mongoose.model("User", UserSchema);
