"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const product_validation_1 = require("./product.validation");
const SchemaValidation_1 = __importDefault(require("../../middlewares/SchemaValidation"));
const product_controller_1 = require("./product.controller");
const productRoutes = express_1.default.Router();
productRoutes.get("/", (0, auth_1.default)("admin", "customer"), product_controller_1.productController.getAllProduct);
productRoutes.get("/:productId", (0, auth_1.default)("admin", "customer"), product_controller_1.productController.getSingleProduct);
productRoutes.post("/create-product", (0, auth_1.default)("admin"), (0, SchemaValidation_1.default)(product_validation_1.productValidation.createProductSchema), product_controller_1.productController.createProduct);
productRoutes.patch("/product-update/:productId", (0, auth_1.default)("admin"), (0, SchemaValidation_1.default)(product_validation_1.productValidation.updateProductSchema), product_controller_1.productController.updateProduct);
productRoutes.patch("/product-delete/:productId", (0, auth_1.default)("admin"), product_controller_1.productController.deleteProduct);
exports.default = productRoutes;
//# sourceMappingURL=product.route.js.map