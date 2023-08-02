const { Schema, default: mongoose } = require("mongoose");

const modelColumnSchema = new Schema({
  modelId: {
    type: Schema.Types.UUID,
    require: true,
  },
  column: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    enum: ["int", "text", "boolean", "date"],
  },
});

const ModelColumn = mongoose.model("ModelColumn", modelColumnSchema);
