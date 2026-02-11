import express from "express";
import { orderController } from "./order.controller";
import { UserRole } from "../user/user.model";
import Auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", Auth(UserRole.CUSTOMER), orderController.createOrder);
router.get("/my-orders", Auth(UserRole.CUSTOMER), orderController.getMyOrders);
router.get(
  "/:orderId",
  Auth(UserRole.CUSTOMER),
  orderController.getSingleOrder,
);
router.patch(
  "/:orderId/status",
  Auth(UserRole.ADMIN, UserRole.CUSTOMER),
  orderController.updateOrderStatus,
);

export const orderRoutes = router;
