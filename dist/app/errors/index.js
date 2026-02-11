"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = exports.handleValidationError = exports.handleDuplicateError = exports.handleCastError = void 0;
const handleCastError = (err) => {
    const statusCode = 400;
    const errorSource = [{ path: err.path, message: err.message }];
    return {
        statusCode,
        message: "Invalid Id",
        errorSource,
    };
};
exports.handleCastError = handleCastError;
const handleDuplicateError = (err) => {
    const statusCode = 400;
    const match = err.message.match(/"([^"]*)"/);
    const extracted_msg = match && match[1];
    const errorSource = [
        { path: "", message: ` ${extracted_msg} is already exists ` },
    ];
    return {
        statusCode,
        message: "Duplicated Error",
        errorSource,
    };
};
exports.handleDuplicateError = handleDuplicateError;
const handleValidationError = (err) => {
    const errorSource = Object.values(err.errors).map((val) => {
        return {
            path: val.name,
            message: val.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "validation Error",
        errorSource,
    };
};
exports.handleValidationError = handleValidationError;
const handleZodError = (err) => {
    let statusCode = 400;
    let errorSource = err.issues.map((issue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        message: "Zod Validation Error",
        errorSource,
    };
};
exports.handleZodError = handleZodError;
//# sourceMappingURL=index.js.map