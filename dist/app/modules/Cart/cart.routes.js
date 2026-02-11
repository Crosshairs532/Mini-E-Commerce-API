"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const CartRouter = express_1.default.Router();
CartRouter.use((0, auth_1.default)("customer"));
CartRouter.get("/", cart_controller_1.cartController.getMyCart);
CartRouter.post("/add-to-cart", cart_controller_1.cartController.addToCart);
CartRouter.patch("/update", cart_controller_1.cartController.updateCartItem);
CartRouter.delete("/remove/:productId", cart_controller_1.cartController.removeFromCart);
CartRouter.delete("/clear", cart_controller_1.cartController.clearCart);
exports.cartRoutes = CartRouter;
//# sourceMappingURL=cart.routes.js.map