const { createLogger, format, transports } = require("winston");

const uncaughtExceptionLogger = createLogger({
  transports: [new transports.File({ filename: "logfile.log" })],
});

const expressExceptionsLogger = createLogger({
  transports: [
    new transports.File({ filename: "logfile.log" }),
    new transports.MongoDB({ db: "mongodb://localhost/vidly" }),
  ],
});

exports.uncaughtExceptionLogger = uncaughtExceptionLogger;
exports.expressExceptionsLogger = expressExceptionsLogger;
