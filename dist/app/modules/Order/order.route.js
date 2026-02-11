"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const user_model_1 = require("../user/user.model");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_model_1.UserRole.CUSTOMER), order_controller_1.orderController.createOrder);
router.get("/my-orders", (0, auth_1.default)(user_model_1.UserRole.CUSTOMER), order_controller_1.orderController.getMyOrders);
router.get("/:orderId", (0, auth_1.default)(user_model_1.UserRole.CUSTOMER), order_controller_1.orderController.getSingleOrder);
router.patch("/:orderId/status", (0, auth_1.default)(user_model_1.UserRole.ADMIN, user_model_1.UserRole.CUSTOMER), order_controller_1.orderController.updateOrderStatus);
exports.orderRoutes = router;
//# sourceMappingURL=order.route.js.map