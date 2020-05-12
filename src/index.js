import winston from "winston";
import Bugsnag from "@bugsnag/js";
import {
    $
} from "@dekproject/scope";
import BugsnagTransport from "./winston-bugsnag";

export default async () => {
    try {
        if (
            !Object.prototype.hasOwnProperty.call(
                process.env,
                "LOGGER_BUGSNAG_API_KEY"
            )
        ) {
            // eslint-disable-next-line no-console
            console.log(
                "[ LOGGER ] - There is no LOGGER_BUGSNAG_API_KEY variable in the .env file."
            );
        } else {
            const logger = winston.createLogger({
                level: "info",
                format: winston.format.json(),
                transports: [
                    new BugsnagTransport({ level: "error" })
                ]
            });
            // 
            if (process.env.NODE_ENV !== "production") {
                logger.add(new winston.transports.Console({
                    format: winston.format.simple()
                }));
            }
            $.set(
                "logger",
                logger
            );

            $.set("bugsnagexpress",
                Bugsnag.getPlugin("express")
            );
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`[ Logger ] - ${e.message}`);
    }
};
