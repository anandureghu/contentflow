const AuthService = require("./auth.service");
const { validateUser } = require("../../validations/user.validation");
const Response = require("../../common/dto/response.dto");
const httpStatus = require("http-status");
const { handleError } = require("../../common/exception/handle.exception");

const authService = new AuthService();
class AuthController {
  Login(req, res) {}
  async Register(req, res) {
    const userData = req.body;
    try {
      validateUser(userData);
      const createdUser = await authService.register(userData);
      const response = new Response(
        httpStatus.OK,
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
