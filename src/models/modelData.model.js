const { Schema, default: mongoose } = require("mongoose");

const modelDataSchema = new Schema({
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  columnId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
  },
});

const ModelData = mongoose.model("ModelData", modelDataSchema);

module.exports = ModelData;
