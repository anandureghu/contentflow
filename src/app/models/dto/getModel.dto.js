const Response = require("../../../common/dto/response.dto");

class GetModelDto extends Response {
  constructor(code, msg, data) {
    super(code, msg, data);
  }
}

module.exports = GetModelDto;
