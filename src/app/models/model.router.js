const modelRouter = require("express").Router();
const ModelController = new (require("./model.controller"))();

modelRouter.get("/", ModelController.GetAllModels);
modelRouter.post("/", ModelController.CreateModel);

modelRouter.get("/:model", ModelController.GetModel);
modelRouter.put("/:model", ModelController.UpdateModel);
modelRouter.delete("/:model", ModelController.DeleteModel);

modelRouter.post("/:model", ModelController.CreateModelData);
modelRouter.get("/:model:modelRowId", ModelController.GetModelData);
modelRouter.put("/:model", ModelController.UpdateModelData);
modelRouter.delete("/:model", ModelController.DeleteModelData);

module.exports = modelRouter;
