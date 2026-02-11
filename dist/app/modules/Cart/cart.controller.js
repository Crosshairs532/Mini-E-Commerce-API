"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const SendResponse_1 = require("../../utils/SendResponse");
const cart_service_1 = require("./cart.service");
const getMyCart = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const userEmail = req.user.email;
    const result = await cart_service_1.cartService.getMyCart(userEmail);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Cart retrieved successfully!",
        data: result,
    });
});
const addToCart = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const userEmail = req.user.email;
    const { productId, quantity } = req.body;
    const result = await cart_service_1.cartService.addToCart(userEmail, productId, quantity);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product added to cart successfully!",
        data: result,
    });
});
const updateCartItem = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const userEmail = req.user.email;
    const { productId, quantity } = req.body;
    const result = await cart_service_1.cartService.updateCartItem(userEmail, productId, quantity);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Cart updated successfully!",
        data: result,
    });
});
const removeFromCart = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const userEmail = req.user.email;
    const { productId } = req.params;
    const result = await cart_service_1.cartService.removeFromCart(userEmail, productId);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product removed from cart successfully!",
        data: result,
    });
});
const clearCart = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const userEmail = req.user.email;
    const result = await cart_service_1.cartService.clearCart(userEmail);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Cart cleared successfully!",
        data: result,
    });
});
exports.cartController = {
    getMyCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
//# sourceMappingURL=cart.controller.js.map