"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const SendResponse_1 = require("../../utils/SendResponse");
const auth_service_1 = require("./auth.service");
const RegisterUser = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const body = req.body;
    const result = await auth_service_1.authService.RegisterUser(body);
    (0, SendResponse_1.sendResponse)(res, {
        success: true,
        data: result,
        message: "User created successfully",
    });
});
const LoginUser = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const body = req.body;
    const result = await auth_service_1.authService.LoginUser(body);
    (0, SendResponse_1.sendResponse)(res, {
        success: true,
        data: result,
        message: "User Logged in successfully",
    });
});
exports.authController = { RegisterUser, LoginUser };
//# sourceMappingURL=auth.controller.js.map