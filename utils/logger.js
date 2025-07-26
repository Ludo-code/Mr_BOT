import winston from "winston";
import "winston-daily-rotate-file";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: "logs/Mr_BOT-%DATE%.log",
            datePattern: "DD-MM-YYYY",
            maxSize: "20m",
            maxFiles: "180d",
            zippedArchive: true,
        }),
    ],
});

export default logger;
