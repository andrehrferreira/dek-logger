import "@babel/polyfill/noConflict";

import dotenv from "dotenv";
import { $, plugins, logger } from "@dekproject/scope";

(async () => {
    dotenv.config();
    await plugins("./build");

    $.wait(["logger"], 5000).then(() => {
        logger.debug("Test debug");
        logger.info("Test info");
        var teste = null;
        teste.error = true;
    }).catch((err) => {
        logger.error(err);
        process.exit(-1);
    });
}) ();