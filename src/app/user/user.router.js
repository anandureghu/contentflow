const userRouter = require("express").Router();
const UserController = require("./user.controller");
const userController = new UserController();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);

userRouter.get("/:userId", userController.getUser);
userRouter.put("/:userId", userController.updateUser);
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;
