import winston from "winston";

export const logFormat = winston.format.printf(
  ({ message }) =>
    `${
      new Date().toDateString() + " - " + new Date().toLocaleTimeString()
    }:- ${message}`
);

export const logger = winston.createLogger({
  exitOnError: false,
  format: winston.format.combine(logFormat),
  transports: [
    new winston.transports.Console({
      level: "info",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.simple(),
        logFormat,
        winston.format.colorize({ all: true }),
        winston.format.splat()
      ),
    }),
  ],
});

export const logInfo = (data: any) => {
  logger.info(JSON.stringify(data, null, 2));
};

export const logError = (data: any) => {
  logger.error(JSON.stringify(data, null, 2));
};

export const logWarning = (data: any) => {
  logger.warn(JSON.stringify(data, null, 2));
};
