import winston from "winston";
import Bugsnag from "@bugsnag/js";
import Transport from "winston-transport";
import BugsnagPluginExpress from "@bugsnag/plugin-express";
import { $ } from "@dekproject/scope";
class BugsnagTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.silent = opts && opts.silent || false;
        this.level = opts && opts.level || "silly";
        Bugsnag.start({
            apiKey: process.env.LOGGER_BUGSNAG_API_KEY,
            plugins: [BugsnagPluginExpress]
        });
    }
    log (info, callback) {
        setImmediate(() => this.emit("logged", info));
        if (this.silent) {
            if (typeof callback == "function") return callback();
            return;
        }
        if(info instanceof Error) {
            Bugsnag.notify(info);
        } else if(typeof info.message == "string") {
            Bugsnag.notify(new Error(info.message));
        }
        if (typeof callback == "function") return callback();
        return;
    }
}

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

            let consoleWarnLevels = [];

            if (process.env.NODE_ENV == "production") {
                consoleWarnLevels =  ["warn", "info", "error"];
            }

            logger.add(new winston.transports.Console({
                format: winston.format.simple(),
                consoleWarnLevels
            }));
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
