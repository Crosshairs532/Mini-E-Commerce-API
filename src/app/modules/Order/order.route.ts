import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.model";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);

router.get("/my-orders", auth(UserRole.CUSTOMER), orderController.getMyOrders);

router.get(
  "/:orderId",
  auth(UserRole.CUSTOMER),
  orderController.getSingleOrder,
);

router.patch(
  "/:orderId/status",
  auth(UserRole.ADMIN),
  orderController.updateOrderStatus,
);

export const orderRoutes = router;
