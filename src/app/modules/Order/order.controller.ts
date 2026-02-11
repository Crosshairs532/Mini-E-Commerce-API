import { Request, Response } from "express";
import status from "http-status";
import { orderService } from "./order.service";
import { CatchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/SendResponse";
import { OrderStatus } from "./order.model";

const createOrder = CatchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email;
  const result = await orderService.createOrder(userEmail);
  return sendResponse(res, {
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

const getMyOrders = CatchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email;

  const result = await orderService.getMyOrders(userEmail);

  return sendResponse(res, {
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const getSingleOrder = CatchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const userEmail = req.user.email;

  const result = await orderService.getSingleOrder(
    orderId as string,
    userEmail,
  );

  return sendResponse(res, {
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

const updateOrderStatus = CatchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status: newStatus } = req.body;

  const result = await orderService.updateOrderStatus(
    orderId as string,
    newStatus as OrderStatus,
  );

  return sendResponse(res, {
    success: true,
    message: "Order status updated successfully",
    data: result,
  });
});

export const orderController = {
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
};
