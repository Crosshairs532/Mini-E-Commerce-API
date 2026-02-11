"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemaValidation = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const result = await schema.parseAsync(data);
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = schemaValidation;
//# sourceMappingURL=SchemaValidation.js.map