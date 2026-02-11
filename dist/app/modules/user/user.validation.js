"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    name: zod_1.z.string({
        error: (iss) => iss.input == undefined ? "Name is Required" : "Name must be a string",
    }),
    email: zod_1.z.email("Invalid email"),
    password: zod_1.z
        .string({
        error: (iss) => iss.input == undefined
            ? "Password is Required"
            : "Password must be a string",
    })
        .max(20, { message: "Password must be less than 20 characters" }),
    role: zod_1.z.enum(["customer", "admin"]),
});
const userLogin = zod_1.z.object({
    email: zod_1.z.email("Invalid email"),
    password: zod_1.z
        .string({
        error: (iss) => iss.input == undefined
            ? "Password is Required"
            : "Password must be a string",
    })
        .max(20, { message: "Password must be less than 20 characters" }),
});
exports.userValidationSchema = { userValidation, userLogin };
//# sourceMappingURL=user.validation.js.map