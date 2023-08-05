const httpStatus = require("http-status");

class NotFoundException extends Error {
  constructor(msg) {
    super(msg);
    this.code = httpStatus.NOT_FOUND;
    this.msg = msg;
  }
}

module.exports = NotFoundException;
