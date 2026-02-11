"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWithEmail = void 0;
const user_model_1 = require("../modules/user/user.model");
const getUserWithEmail = async (userEmail) => {
    return await user_model_1.userModel.findOne({ email: userEmail });
};
exports.getUserWithEmail = getUserWithEmail;
//# sourceMappingURL=GetUser.js.map