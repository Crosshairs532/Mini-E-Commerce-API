"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, result) => {
    return res.status(200).json({
        success: result.success,
        message: result.message,
        data: result.data,
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=SendResponse.js.map