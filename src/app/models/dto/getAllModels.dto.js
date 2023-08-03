const Response = require("../../../common/dto/response.dto");

class GetAllModelsDto extends Response {
  constructor(code, msg, data, count, total) {
    super(code, msg, data);
    this.count = count;
    this.total = total;
  }
}

module.exports = GetAllModelsDto;
