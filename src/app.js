require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config/config");
const logger = require("./utils/logger");
const routers = require("./routes/routes");
const db = require("./database/connection");
const modelRouter = require("./app/models/model.router");
const authRouter = require("./app/auth/auth.router");

const app = express();
app.use(bodyParser.json());

const basePath = "/api/v1";

app.use(basePath + "/models", modelRouter);
app.use(basePath + "/auth", authRouter);

const PORT = config.app.port;
app.listen(PORT, () => {
  db.connect();
  logger.info(`server started listening on port ${PORT}`);
});
