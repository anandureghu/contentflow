const BadRequestException = require("../../common/exception/BadRequest.execption");
const NotFoundException = require("../../common/exception/NotFound.exception");
const config = require("../../config/config");
const User = require("../../models/user.model");
const { ROLES } = require("../../utils/constants");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { ADMIN, VIEWER } = ROLES;
class AuthService {
  async login({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new NotFoundException("no user account found");
    }
    if (!isPasswordMatching(password, user.password)) {
      throw new BadRequestException("invalid password");
    } else {
      const payload = user.toObject();
      delete payload.password;
      return signToken(payload);
    }
  }

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

function isPasswordMatching(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function signToken(payload) {
  var token = jwt.sign(payload, config.app.jwt_secret);
  console.log(token);
  return token;
}

module.exports = AuthService;
