import {Server} from "@server";
import "module-alias/register";

(async () => {
    await new Server(3000, "development").run();
})()
