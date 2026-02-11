"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./app/config");
const mongoose_1 = __importDefault(require("mongoose"));
main().catch((err) => console.log(err));
let server;
async function main() {
    const { port, url } = config_1.configFiles;
    await mongoose_1.default.connect(url);
    //   superAdmin();
    server = app_1.default.listen(port, () => {
        console.log(`Mini E-commerce server is listening on port ${port}`);
    });
}
// for asynchronous  behavior
process.on("unhandledRejection", (reason, promise) => {
    console.log(`UnhandledRejection is detected, shutting down server....`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//  for synchronous behavior
process.on("uncaughtException", (err) => {
    console.log(`UnCaughtRejection is detected, shutting down server....`);
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map