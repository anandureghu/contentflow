const { PORT, NODE_ENV, JWT_SECRET } = process.env;
module.exports = {
  port: PORT,
  env: NODE_ENV,
  jwt_secret: JWT_SECRET,
};
