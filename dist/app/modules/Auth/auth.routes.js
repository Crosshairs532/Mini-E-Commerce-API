"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const SchemaValidation_1 = __importDefault(require("../../middlewares/SchemaValidation"));
const user_validation_1 = require("../user/user.validation");
const authRoutes = express_1.default.Router();
authRoutes.post("/registration", (0, SchemaValidation_1.default)(user_validation_1.userValidationSchema.userValidation), auth_controller_1.authController.RegisterUser);
authRoutes.post("/login", (0, SchemaValidation_1.default)(user_validation_1.userValidationSchema.userLogin), auth_controller_1.authController.LoginUser);
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map