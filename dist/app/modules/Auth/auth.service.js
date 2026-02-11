"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const auth_utils_1 = require("./auth.utils");
const config_1 = require("../../config");
const RegisterUser = async (userData) => {
    // check if user exists
    const isUserExist = await user_model_1.userModel.isUserExist(userData.email);
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User with this email already exists!");
    }
    //  save the user to DB and return result
    const res = await user_model_1.userModel.create(userData);
    return res;
};
const LoginUser = async (userData) => {
    // user exist
    const isUserExist = await user_model_1.userModel.isUserExist(userData?.email);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Does not Exist! Register first");
    }
    const payload = {
        role: isUserExist.role,
        email: isUserExist.email,
    };
    // password check
    const isPasswordRight = await user_model_1.userModel.checkPassword(userData.password, isUserExist.password);
    console.log(isPasswordRight);
    if (!isPasswordRight) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    // jwt token
    const accessToken = (0, auth_utils_1.generateToken)(payload, config_1.configFiles.jwt_secret, "2d");
    const result = {
        name: isUserExist.name,
        ...payload,
        accessToken,
    };
    return result;
};
exports.authService = { RegisterUser, LoginUser };
//# sourceMappingURL=auth.service.js.map