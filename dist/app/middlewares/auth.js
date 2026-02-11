"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("./../utils/catchAsync");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const AppError_1 = __importDefault(require("./AppError"));
const http_status_1 = __importDefault(require("http-status"));
// roles based authorization
const Auth = (...roles) => {
    return (0, catchAsync_1.CatchAsync)(async (req, res, next) => {
        // token from headers
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You must be logged in to access this feature");
        }
        // decode the token
        const decodedToken = (await jsonwebtoken_1.default.verify(token, config_1.configFiles.jwt_secret));
        if (!decodedToken) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You must be logged in to access this feature");
        }
        // check if the user exists
        const isUserExist = await user_model_1.userModel.isUserExist(decodedToken?.email);
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "User with this email already exists!");
        }
        // check if the usr role and given route role are same
        if (roles && !roles.includes(decodedToken?.role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to access this resource");
        }
        // add the user with the user
        req.user = decodedToken;
        next();
    });
};
exports.default = Auth;
//# sourceMappingURL=auth.js.map