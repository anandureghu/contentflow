const { default: mongoose } = require("mongoose");
const ModelColumn = require("../../models/modelColumn.model");
const Model = require("../../models/models.model");
const NotFoundException = require("../../common/exception/NotFound.exception");
const ModelData = require("../../models/modelData.model");

class ModelService {
  getAllModels() {
    return Model.find();
  }

  async createModel({ name, columns }, session) {
    const allColumns = [
      ...columns,
      { column: "createdAt", type: "date" },
      { column: "updatedAt", type: "date" },
    ];

    const newColumns = {};
    newColumns.model = await Model.create([{ name: name?.toLowerCase() }], {
      session,
    });

    allColumns.forEach((column) => (column.modelId = newColumns.model[0].id));

    newColumns.columns = await ModelColumn.create(allColumns, { session });
    await session.commitTransaction();

    return newColumns;
  }

  async getModel(modelId) {
    const model = await Model.findOne(
      {
        _id: modelId,
      },
      { __v: 0 }
    );

    if (model) {
      const columns = await ModelColumn.find(
        { modelId: model._id },
        { __v: 0, modelId: 0 }
      ).exec();

      const result = {
        model,
        columns,
      };

      return result;
    } else {
      throw new NotFoundException("model not found");
    }
  }

  async getModelRowData(modelId) {
    const modelData = await ModelData.find({ modelId }, { __v: 0, modelId: 0 });
    return modelData;
  }

  async getModelRowData(modelId, modelRowId) {
    const modelRowData = await ModelData.find(
      { modelId, _id: modelRowId },
      { __v: 0, modelId: 0 }
    );
    if(!modelRowData){
      throw new NotFoundException()
    }
    return modelRowData;
  }
}

module.exports = ModelService;
