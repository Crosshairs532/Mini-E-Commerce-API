"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secret, time) => {
    const options = { expiresIn: time };
    const token = jsonwebtoken_1.default.sign(payload, secret, options);
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.utils.js.map