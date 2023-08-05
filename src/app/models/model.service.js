const ModelColumn = require("../../models/modelColumn.model");
const Model = require("../../models/models.model");

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
}

module.exports = ModelService;
