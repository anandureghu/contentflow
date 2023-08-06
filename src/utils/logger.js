const { format, transports, createLogger, config } = require("winston");

const customFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({
    format: "YY-MM-DD HH:mm:ss",
  }),
  format.printf((info) => {
    const level = info.level;
    return `[${level}] [${info.timestamp}]: ${info.message}`;
  })
);

const logConfiguration = {
  transports: [new transports.Console()],
  format: format.combine(format.colorize(), customFormat),
};

const logger = createLogger(logConfiguration);
module.exports = logger;
