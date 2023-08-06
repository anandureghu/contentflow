const User = require("../../models/user.model");
const { ROLES } = require("../../utils/constants");
const bcrypt = require("bcrypt");

const { ADMIN, VIEWER } = ROLES;
class AuthService {
  async register(userData) {
    const user = await User.findOne();
    let role = VIEWER;
    if (!user) {
      role = ADMIN;
    }
    userData.role = role;
    userData.password = hashPassword(userData.password);
    const createdUser = (await User.create(userData)).toObject();
    delete createdUser.password;
    return createdUser;
  }
}

function hashPassword(password) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = AuthService;
