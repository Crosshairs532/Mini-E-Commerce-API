"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const order_model_1 = require("./order.model");
const cart_model_1 = require("../Cart/cart.model");
const product_model_1 = require("../Product/product.model");
const GetUser_1 = require("../../utils/GetUser");
const user_model_1 = require("../user/user.model");
const createOrder = async (userEmail) => {
    const user = await (0, GetUser_1.getUserWithEmail)(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist!");
    }
    const userId = user?._id;
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const cart = await cart_model_1.CartModel.findOne({ user: userId }).session(session);
        if (!cart || cart.items.length === 0) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cart is empty");
        }
        let totalAmount = 0;
        const order = await order_model_1.OrderModel.create([
            {
                user: user?._id,
                totalAmount: 0,
                status: order_model_1.OrderStatus.PENDING,
            },
        ], { session });
        if (!order[0]) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Something went wrong while ordering");
        }
        const orderId = order[0]?._id;
        const orderItemIds = [];
        for (const item of cart.items) {
            const product = await product_model_1.ProductModel.findById(item.product).session(session);
            if (!product || product.isDeleted) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
            }
            if (product.stock < item.quantity) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Insufficient stock for ${product.name}`);
            }
            product.stock -= item.quantity;
            await product.save({ session });
            const priceAtPurchase = product.price;
            totalAmount += priceAtPurchase * item.quantity;
            const orderItem = await order_model_1.OrderItemModel.create([
                {
                    order: orderId,
                    product: product._id,
                    quantity: item.quantity,
                    priceAtPurchase,
                },
            ], { session });
            orderItemIds.push(orderItem[0]?._id);
        }
        order[0].items = orderItemIds;
        order[0].totalAmount = totalAmount;
        await order[0]?.save({ session });
        cart.items = [];
        await cart.save({ session });
        await session.commitTransaction();
        session.endSession();
        return order[0];
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getMyOrders = async (userEmail) => {
    const user = await (0, GetUser_1.getUserWithEmail)(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist!");
    }
    const userId = user?._id;
    return await order_model_1.OrderModel.find({ user: userId }).populate("items.product");
};
const getSingleOrder = async (orderId, userEmail) => {
    const user = await (0, GetUser_1.getUserWithEmail)(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist!");
    }
    const userId = user?._id;
    const order = await order_model_1.OrderModel.findOne({
        _id: orderId,
        user: userId,
    }).populate("items.product");
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    return order;
};
const updateOrderStatus = async (user, orderId, newStatus) => {
    const order = await order_model_1.OrderModel.findById(orderId);
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    order.status = newStatus;
    await order.save();
    // if customer
    // check cancellation if it is customer otherwise leave it.
    if (user.role == "customer") {
        const updatedUser = await user_model_1.userModel.findOneAndUpdate({ email: user.email, cancellationCount: { $lte: 5 } }, { $inc: { cancellationCount: 1 } }, { returnDocument: "after" });
        if (!updatedUser) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User cancellation limit exceeded");
        }
    }
    return order;
};
exports.orderService = {
    createOrder,
    getMyOrders,
    getSingleOrder,
    updateOrderStatus,
};
//# sourceMappingURL=order.service.js.map