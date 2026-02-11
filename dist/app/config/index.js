"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFiles = void 0;
require("dotenv").config({ path: [process.cwd(), ".env"] });
exports.default = { port: process.env.PORT, DB: process.env.DB };
exports.configFiles = {
    port: process.env.PORT,
    url: process.env.MONGODB_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_secret: process.env.JWT_SECRET,
    cloudinary: {
        cloudinary_name: process.env.CLOUDINARY_NAME,
        cloudinary_api: process.env.CLOUDINARY_KEY,
        cloudinary_secret: process.env.CLOUDINARY_SECRET,
    },
};
//# sourceMappingURL=index.js.map