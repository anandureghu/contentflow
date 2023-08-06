const { Schema, default: mongoose } = require("mongoose");

const modelRowSchema = new Schema({
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now(),
  },
});

const ModelRow = mongoose.model("ModelRow", modelRowSchema);

module.exports = ModelRow;
