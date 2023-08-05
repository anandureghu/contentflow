const { Schema, default: mongoose } = require("mongoose");

const modelColumnSchema = new Schema({
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  column: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["int", "string", "boolean", "date"],
  },
});

const ModelColumn = mongoose.model("ModelColumn", modelColumnSchema);

module.exports = ModelColumn;
