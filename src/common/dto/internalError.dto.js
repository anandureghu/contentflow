const httpStatus = require("http-status");
const ErrorDto = require("./error.dto");

class InternalServerError extends ErrorDto {
  constructor(msg, data) {
    super(httpStatus.INTERNAL_SERVER_ERROR, msg);
    this.data = data;
  }
}

module.exports = InternalServerError;
