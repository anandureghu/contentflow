const AuthService = require("./auth.service");
const {
  validateUser,
  validateLoginData,
} = require("../../validations/user.validation");
const Response = require("../../common/dto/response.dto");
const httpStatus = require("http-status");
const { handleError } = require("../../common/exception/handle.exception");

const authService = new AuthService();
class AuthController {
  async Login(req, res) {
    const loginData = req.body;
    try {
      validateLoginData(loginData);
      const bearer_token = await authService.login(loginData);
      const response = new Response(httpStatus.OK, "logined successfully", {
        bearer_token,
      });
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  async Register(req, res) {
    const userData = req.body;
    try {
      const createdUser = await authService.register(userData);
      const response = new Response(
        httpStatus.CREATED,
        "successfully created user",
        createdUser
      );
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = AuthController;
