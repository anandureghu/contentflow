const modelRouter = require("express").Router();
const ModelController = require("./model.controller");
const modelController = new ModelController();

modelRouter.get("/", modelController.GetAllModels);
modelRouter.post("/", modelController.CreateModel);

modelRouter.get("/:modelId", modelController.GetModel);
modelRouter.put("/:model", modelController.UpdateModel);
modelRouter.delete("/:model", modelController.DeleteModel);

modelRouter.post("/:modelId", modelController.CreateModelData);
modelRouter.get("/:modelId/:modelRowId", modelController.GetModelRowData);
modelRouter.put("/:model", modelController.UpdateModelData);
modelRouter.delete("/:model", modelController.DeleteModelData);

module.exports = modelRouter;
