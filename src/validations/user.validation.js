const { validateRequired } = require("./validations");

exports.validateLoginData = ({ username, password }) => {
  validateRequired(username, "username");
  validateRequired(password, "password");
};
