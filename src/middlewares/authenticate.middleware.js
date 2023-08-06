const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { ROLES } = require("../utils/constants");
const httpStatus = require("http-status");
const { handleError } = require("../common/exception/handle.exception");

module.exports = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("x-auth-token");

  // Check if token is missing
  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ msg: "authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.app.jwt_secret);
    const user = decoded.user;

    // Add the decoded user to the request object
    req.user = user;
    if (user.role === ROLES.VIEWER && req.method !== "GET") {
      return res.status(httpStatus.FORBIDDEN).json({ msg: "access denied" });
    }
    if (
      user.role === ROLES.EDITOR &&
      (req.method === "DELETE" || req.method === "OPTIONS")
    ) {
      return res.status(httpStatus.FORBIDDEN).json({ msg: "access denied" });
    }

    if (req.baseUrl === "/api/v1/users" && user.role == ROLES.VIEWER) {
      return res.status(httpStatus.FORBIDDEN).json({ msg: "access denied" });
    }

    next();
  } catch (err) {
    handleError(err);
  }
};
