"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeRoute = express_1.default.Router();
homeRoute.get("", (req, res) => {
    res.send("Mini E-Commerce API");
});
exports.default = homeRoute;
//# sourceMappingURL=index.js.map