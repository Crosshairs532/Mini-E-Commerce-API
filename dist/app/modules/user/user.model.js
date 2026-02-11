"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("../../config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["CUSTOMER"] = "customer";
})(UserRole || (exports.UserRole = UserRole = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        required: true,
        default: UserRole.CUSTOMER,
    },
    cancellationCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
// hash password before saving
userSchema.pre("save", async function () {
    const user = this;
    console.log(user);
    try {
        const hash = await bcryptjs_1.default.hash(user.password, Number(config_1.configFiles.bcrypt_salt_rounds));
        user.password = hash;
    }
    catch (err) {
        throw err;
    }
});
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
userSchema.statics.isUserExist = async function (email) {
    return exports.userModel.findOne({ email }).select("+password");
};
userSchema.statics.checkPassword = async function (loginPass, storedPass) {
    return await bcryptjs_1.default.compare(loginPass, storedPass);
};
exports.userModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.model.js.map