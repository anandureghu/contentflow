const authRouter = require("express").Router();
const AuthController = new (require("./auth.controller"))();

authRouter.post("/login", AuthController.Login);
authRouter.post("/register", AuthController.Register);

module.exports = authRouter;
