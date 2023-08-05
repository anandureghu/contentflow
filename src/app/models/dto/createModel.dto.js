const Response = require("../../../common/dto/response.dto");

class CreateModelDto extends Response {
  constructor(code, msg, data) {
    super(code, msg, data);
  }
}

module.exports = CreateModelDto;
