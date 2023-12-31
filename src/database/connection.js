const mongoose = require("mongoose");
const config = require("../config/config");
const logger = require("../utils/logger");

async function connect() {
  logger.info("connecting to database");
  mongoose
    .connect(config.db.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("connected to database successfully");
    })
    .catch((err) => {
      logger.error("connection to database failed >>> " + err);
    });
}

module.exports = {
  connect,
  db: mongoose,
};
