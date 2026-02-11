"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const route_1 = __importDefault(require("./app/Routes/route"));
const globarError_1 = __importDefault(require("./app/middlewares/globarError"));
const notFount_1 = __importDefault(require("./app/middlewares/notFount"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use("/api/v1", route_1.default);
// global error
app.use(globarError_1.default);
app.use(notFount_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map