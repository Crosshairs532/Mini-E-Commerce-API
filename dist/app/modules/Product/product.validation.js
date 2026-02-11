"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z
        .string({ error: "Product name must be string" })
        .trim()
        .min(1, "Product name is required"),
    description: zod_1.z
        .string()
        .trim()
        .optional()
        .default("No details has been given"),
    price: zod_1.z
        .number()
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative"),
    stock: zod_1.z
        .number()
        .int("Stock must be an integer")
        .nonnegative("Stock cannot be negative"),
});
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z
        .string({ error: "Product name must be string" })
        .trim()
        .min(1, "Product name is required")
        .optional(),
    description: zod_1.z
        .string()
        .trim()
        .optional()
        .default("No details has been given")
        .optional(),
    price: zod_1.z
        .number()
        .int("Price must be an integer")
        .nonnegative("Price cannot be negative")
        .optional(),
    stock: zod_1.z
        .number()
        .int("Stock must be an integer")
        .nonnegative("Stock cannot be negative")
        .optional(),
});
exports.productValidation = { createProductSchema: exports.createProductSchema, updateProductSchema: exports.updateProductSchema };
//# sourceMappingURL=product.validation.js.map