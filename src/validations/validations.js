const { isValidObjectId } = require("mongoose");
const BadRequestException = require("../common/exception/BadRequest.execption");

exports.validateRequired = (value, field) => {
  if (!value) {
    throw new BadRequestException(`required field: ${field}`);
  }
};

exports.validId = (id) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestException("please provide a valid id");
  }
};
