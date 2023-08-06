const httpStatus = require("http-status");
const logger = require("../../utils/logger");
const InternalServerError = require("../dto/internalError.dto");

exports.handleError = (error, res) => {
  logger.error(error);
  if (res) {
    try {
      res.status(error.code).send(error);
    } catch (err) {
      const response = new InternalServerError(error.message, error);
      res.status(response.code).send(response);
    }
  }
};
