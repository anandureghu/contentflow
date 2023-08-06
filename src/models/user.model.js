const { Schema, default: mongoose } = require("mongoose");
const { ROLES } = require("../utils/constants");

const { VIEWER, EDITOR, ADMIN } = ROLES;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: [ADMIN, EDITOR, VIEWER],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
