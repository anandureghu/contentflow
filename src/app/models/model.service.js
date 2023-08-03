const Model = require("../../models/models.model");

class ModelService {
  async getAllModels() {
    return Model.find()
  }
}

module.exports = ModelService;
