const Response = require("../../../common/dto/response.dto");

class GetModelDataDto extends Response {
  constructor(code, msg, data) {
    super(code, msg, data);
  }
}

module.exports = GetModelDataDto;
