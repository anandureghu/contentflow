const { Schema, default: mongoose } = require("mongoose");

const modelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Model = mongoose.model("Model", modelSchema);

module.exports = Model;
