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

  async updateModelData(modelId, data, session) {
    try {
      const updatedData = [];

      for (let i = 0; i < data.length; i++) {
        const { dataId, newData } = data[i];

        const modelData = await ModelData.findOneAndUpdate(
          { modelId, _id: dataId },
          { $set: newData },
          { new: true, session }
        );

        if (!modelData) {
          throw new NotFoundException(`Model data with ID ${dataId} not found`);
        }

        updatedData.push(modelData);
      }

      await session.commitTransaction();

      return updatedData;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async deleteModelData(modelId, dataId, session) {
    try {
      const modelData = await ModelData.findOneAndDelete(
        { modelId, _id: dataId },
        { session }
      );

      if (!modelData) {
        throw new NotFoundException("Model data not found");
      }

      await session.commitTransaction();

      return modelData;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async deleteModel(modelId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedModel = await Model.findByIdAndDelete(modelId, { session });

      if (!deletedModel) {
        throw new NotFoundException(`Model with ID ${modelId} not found`);
      }

      await ModelColumn.deleteMany({ modelId }, { session });
      await ModelRow.deleteMany({ modelId }, { session });
      await ModelData.deleteMany({ modelId }, { session });

      await session.commitTransaction();
      session.endSession();

      return deletedModel;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async updateModel(modelId, updatedModel) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingModel = await Model.findById(modelId).session(session);

      if (!existingModel) {
        throw new NotFoundException(`Model with ID ${modelId} not found`);
      }

      const updatedColumns = [];
      if (updatedModel.name) {
        existingModel.name = updatedModel.name.toLowerCase();
      }

      if (updatedModel.columns && Array.isArray(updatedModel.columns)) {
        const existingColumns = await ModelColumn.find({ modelId }, null, {
          session,
        });

        for (const updatedColumn of updatedModel.columns) {
          const existingColumn = existingColumns.find(
            (col) => col._id.toString() === updatedColumn.columnId
          );

          if (!existingColumn) {
            throw new NotFoundException(
              `Column with ID ${updatedColumn.columnId} not found`
            );
          }

          if (updatedColumn.name) {
            existingColumn.name = updatedColumn.name;
          }
          if (updatedColumn.type) {
            existingColumn.type = updatedColumn.type;
          }

          updatedColumns.push(existingColumn.save());
        }
      }

      await Promise.all(updatedColumns);
      await existingModel.save();

      await session.commitTransaction();
      session.endSession();

      return existingModel;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

module.exports = ModelService;
