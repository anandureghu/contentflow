const { default: mongoose } = require("mongoose");
const ModelColumn = require("../../models/modelColumn.model");
const Model = require("../../models/models.model");
const NotFoundException = require("../../common/exception/NotFound.exception");
const ModelData = require("../../models/modelData.model");
const ModelRow = require("../../models/modelRow.model");

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

  async getModelData(modelId) {
    const modelRows = await ModelRow.find({ modelId }, { __v: 0, modelId: 0 });
    const view = modelRows.reduce((newModelRows, row) => {
      newModelRows[row.id] = {
        _id: row.id,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      };
      return newModelRows;
    }, {});
    let newView = {
      ...view,
    };
    for (let i = 0; i < modelRows.length; i++) {
      const row = modelRows[i];
      const modelData = await ModelData.find({ rowId: row.id });
      newView = {
        ...newView,
        [row.id]: {
          ...newView[row.id],
          data: modelData,
        },
      };

      console.log(newView);
    }
    return newView;
  }

  async getModelRowData(modelId, modelRowId) {
    const modelRowData = await ModelData.find(
      { modelId, _id: modelRowId },
      { __v: 0, modelId: 0 }
    );
    if (!modelRowData) {
      throw new NotFoundException();
    }
    return modelRowData;
  }

  async createModelData(modelId, data, session) {
    const modelRow = await ModelRow.create([{ modelId }], { session });
    data.forEach((data) => (data.rowId = modelRow[0].id));
    const datas = await ModelData.create(data, { session });
    await session.commitTransaction();
    return datas;
  }
}

module.exports = ModelService;
