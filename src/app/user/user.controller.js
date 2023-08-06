const httpStatus = require("http-status");
const Response = require("../../common/dto/response.dto");
const { handleError } = require("../../common/exception/handle.exception");
const UserService = require("./user.service");

const userService = new UserService();

class UserController {
  async createUser(req, res) {
    const userData = req.body;
    try {
      const createdUser = await userService.createUser(userData);
      const response = new Response(
        httpStatus.CREATED,
        "User created successfully",
        createdUser
      );
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }
  async getUsers(req, res) {
    try {
      const user = await userService.getAllUsers();
      const response = new Response(httpStatus.OK, "User retrieved", user);
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getUser(req, res) {
    const userId = req.params.userId;
    try {
      const user = await userService.getUserById(userId);
      const response = new Response(httpStatus.OK, "User retrieved", user);
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateUser(req, res) {
    const userId = req.params.userId;
    const userData = req.body;
    try {
      const updatedUser = await userService.updateUser(userId, userData);
      const response = new Response(
        httpStatus.OK,
        "User updated successfully",
        updatedUser
      );
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.userId;
    try {
      await userService.deleteUser(userId);
      const response = new Response(httpStatus.OK, "User deleted successfully");
      res.status(response.code).send(response);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = UserController;
