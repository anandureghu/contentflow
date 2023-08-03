class InternalServerError {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }
}

module.exports = InternalServerError;
