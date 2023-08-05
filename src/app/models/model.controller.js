const httpStatus = require("http-status");
const { GetAllModelsDto, CreateModelDto, GetModelDto } = require("./dto");
const ModelService = require("./model.service");
const InternalServerError = require("../../common/dto/internalError.dto");
const { db } = require("../../database/connection");
const { validateModelId } = require("../../validations/model.validation");
const { handleError } = require("../../common/exception/handle.exception");

const modelService = new ModelService();

class ModelController {
  async GetAllModels(req, res) {
    try {
      const allModels = await modelService.getAllModels();
      const response = new GetAllModelsDto(httpStatus.OK, "success", allModels);
      res.status(response.code).send(response);
    } catch (error) {
      const response = new InternalServerError(
        httpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error
      );
      res.status(response.code).send(response);
    }
  }

  async CreateModel(req, res) {
    const params = {};
    params.name = req.body.name || "";
    params.columns = req.body.columns || [];
    const session = await db.startSession();
    try {
      session.startTransaction();
      const columns = await modelService.createModel(params, session);
      const response = new CreateModelDto(
        httpStatus.CREATED,
        "success",
        columns
      );
      res.status(response.code).send(response);
    } catch (error) {
      await session.abortTransaction();
      const response = new InternalServerError(
        httpStatus.INTERNAL_SERVER_ERROR,
        error.message ? error.message : error
      );
      res.status(response.code).send(response);
    }
  }

  async GetModel(req, res) {
    const modelId = req.params.modelId;
    try {
      validateModelId(modelId);
      const model = await modelService.getModel(modelId);
      const response = new GetModelDto(httpStatus.OK, "success", model);
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  UpdateModel(req, res) {}
  DeleteModel(req, res) {}
  GetModelData(req, res) {}
  CreateModelData(req, res) {}
  UpdateModelData(req, res) {}
  DeleteModelData(req, res) {}
}

module.exports = ModelController;
