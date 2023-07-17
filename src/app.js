require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config/config");
const logger = require("./utils/logger");
const routers = require("./routes/routes");
const app = express();
app.use(bodyParser.json());

const PORT = config.app.port;
app.listen(PORT, () => {
  connectToDB();
  logger.info(`server started listening on port ${PORT}`);
});
