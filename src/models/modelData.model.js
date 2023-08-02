const { Schema, default: mongoose } = require("mongoose");

const modelDataSchema = new Schema({
  columnId: {
    type: Schema.Types.UUID,
    require: true,
  },
  data: {
    type: Schema.Types.Mixed,
  },
});

const ModelData = mongoose.model("ModelData", modelDataSchema);
