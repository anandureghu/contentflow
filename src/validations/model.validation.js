const { validateRequired, validId } = require("./validations");

exports.validateModelId = (modelId) => {
  validateRequired(modelId, "modelId");
  validId(modelId);
};
