"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const catchAsync_1 = require("../../utils/catchAsync");
const SendResponse_1 = require("../../utils/SendResponse");
const createOrder = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const userEmail = req.user.email;
    const result = await order_service_1.orderService.createOrder(userEmail);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Order placed successfully",
        data: result,
    });
});
const getMyOrders = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const userEmail = req.user.email;
    const result = await order_service_1.orderService.getMyOrders(userEmail);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Orders retrieved successfully",
        data: result,
    });
});
const getSingleOrder = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const { orderId } = req.params;
    const userEmail = req.user.email;
    const result = await order_service_1.orderService.getSingleOrder(orderId, userEmail);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Order retrieved successfully",
        data: result,
    });
});
const updateOrderStatus = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const { orderId } = req.params;
    const { status: newStatus } = req.body;
    const user = req.user;
    const result = await order_service_1.orderService.updateOrderStatus(user, orderId, newStatus);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Order status updated successfully",
        data: result,
    });
});
exports.orderController = {
    createOrder,
    getMyOrders,
    getSingleOrder,
    updateOrderStatus,
};
//# sourceMappingURL=order.controller.js.map