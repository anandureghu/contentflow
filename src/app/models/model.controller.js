const httpStatus = require("http-status");
const {
  GetAllModelsDto,
  CreateModelDto,
  GetModelDto,
  GetModelDataDto,
} = require("./dto");
const ModelService = require("./model.service");
const InternalServerError = require("../../common/dto/internalError.dto");
const { db } = require("../../database/connection");
const { validateModelId } = require("../../validations/model.validation");
const { handleError } = require("../../common/exception/handle.exception");
const Response = require("../../common/dto/response.dto");

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
    const properties = req.query.properties;
    try {
      validateModelId(modelId);
      let data;
      if (properties === "true") {
        data = await modelService.getModel(modelId);
      } else {
        data = await modelService.getModelData(modelId);
      }
      const response = new GetModelDto(httpStatus.OK, "success", data);
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  async UpdateModel(req, res) {
    const modelId = req.params.modelId;
    const updatedModel = req.body;
    try {
      validateModelId(modelId);
      const updatedData = await modelService.updateModel(modelId, updatedModel);
      const response = new Response(httpStatus.OK, "success", updatedData);
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  async DeleteModel(req, res) {
    const modelId = req.params.modelId;
    try {
      validateModelId(modelId);
      await modelService.deleteModel(modelId);
      const response = new Response(
        httpStatus.OK,
        "success",
        `Model with ID ${modelId} deleted`
      );
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  async GetModelRowData(req, res) {
    const modelId = req.params.modelId;
    const modelRowId = req.params.modelRowId;
    try {
      validateModelId(modelId);
      validateModelId(modelRowId);
      let data;
      data = await modelService.getModelRowData(modelId, modelRowId);
      const response = new GetModelDto(httpStatus.OK, "success", data);
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  async CreateModelData(req, res) {
    const modelId = req.params.modelId;
    const data = req.body;
    const session = await db.startSession();
    try {
      validateModelId(modelId);
      session.startTransaction();
      const columns = await modelService.createModelData(
        modelId,
        data,
        session
      );
      const response = new CreateModelDto(
        httpStatus.CREATED,
        "success",
        columns
      );
      res.status(response.code).send(response);
    } catch (error) {
      await session.abortTransaction();
      handleError(error, res);
    }
  }

  async UpdateModelData(req, res) {
    const modelId = req.params.modelId;
    const data = req.body;
    const session = await db.startSession();
    try {
      validateModelId(modelId);
      session.startTransaction();
      const updatedColumns = await modelService.updateModelData(
        modelId,
        data,
        session
      );
      const response = new Response(
        httpStatus.OK,
        "success",
        updatedColumns
      );
      res.status(response.code).send(response);
    } catch (error) {
      await session.abortTransaction();
      handleError(error, res);
    }
  }

  async DeleteModelData(req, res) {
    const modelId = req.params.modelId;
    const dataId = req.params.dataId;
    const session = await db.startSession();
    try {
      validateModelId(modelId);
      session.startTransaction();
      await modelService.deleteModelData(modelId, dataId, session);
      const response = new Response(
        httpStatus.OK,
        "success",
        `Data with ID ${dataId} deleted`
      );
      res.status(response.code).send(response);
    } catch (error) {
      await session.abortTransaction();
      handleError(error, res);
    }
  }
}

module.exports = ModelController;
