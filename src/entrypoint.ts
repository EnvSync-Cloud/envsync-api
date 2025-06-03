import { app } from "@/app";
import { CacheClient } from "@/libs/cache";
import { config } from "@/utils/env";

CacheClient.init();

export default {
    fetch: app.fetch.bind(app),
    port: Number(config.PORT),
    idleTimeout: 255,
};