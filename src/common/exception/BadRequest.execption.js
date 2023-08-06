const httpStatus = require("http-status");

class BadRequestException extends Error {
  constructor(msg, errors) {
    super(msg);
    this.code = httpStatus.BAD_REQUEST;
    this.msg = msg;
    this.errors = errors || [];
  }
}

module.exports = BadRequestException;
