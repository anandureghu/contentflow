const ErrorDto = require("./error.dto");

class BadRequest extends ErrorDto {
  constructor(code, msg, errors) {
    super(code, msg);
    this.errors = errors || [];
  }
}

module.exports = BadRequest;
