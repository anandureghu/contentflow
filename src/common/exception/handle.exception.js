const httpStatus = require("http-status");
const logger = require("../../utils/logger");

exports.handleError = (error, res) => {
  if (res) {
    res
      .status(error.code ? error.code : httpStatus.INTERNAL_SERVER_ERROR)
      .send(error);
  } else {
    logger.error(error);
  }
};
