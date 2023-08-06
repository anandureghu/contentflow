const modelRouter = require("express").Router();
const ModelController = require("./model.controller");
const modelController = new ModelController();

modelRouter.get("/", modelController.GetAllModels);
modelRouter.post("/", modelController.CreateModel);

modelRouter.get("/:modelId", modelController.GetModel);
modelRouter.put("/:modelId", modelController.UpdateModel);
modelRouter.delete("/:modelId", modelController.DeleteModel);

modelRouter.post("/:modelId", modelController.CreateModelData);
modelRouter.get("/:modelId/:modelRowId", modelController.GetModelRowData);
modelRouter.put("/:modelId/:", modelController.UpdateModelData);
modelRouter.delete("/:modelId", modelController.DeleteModelData);

module.exports = modelRouter;
