import { config } from "../config/default.js";
import { Server } from "./Server.js";

function main(config){
    const server = new Server(config);
    server.start();
}

main(config)