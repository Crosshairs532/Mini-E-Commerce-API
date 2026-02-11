"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const errors_1 = require("../errors");
const AppError_1 = __importDefault(require("./AppError"));
const globalError = (err, req, res, next) => {
    let statusCode = err.status || http_status_1.default.INTERNAL_SERVER_ERROR || 500;
    let message = err.message || "Something went Wrong";
    let errorSource = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, errors_1.handleZodError)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, errors_1.handleValidationError)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;
    }
    else if (err.name === "castError") {
        const simplifiedError = (0, errors_1.handleCastError)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, errors_1.handleDuplicateError)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message: err || message,
        errorSource,
    });
};
exports.default = globalError;
//# sourceMappingURL=globarError.js.map