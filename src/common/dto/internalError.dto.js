const ErrorDto = require("./error.dto");

class InternalServerError extends ErrorDto {
  constructor(code, msg) {
    super(code, msg);
  }
}

module.exports = InternalServerError;
