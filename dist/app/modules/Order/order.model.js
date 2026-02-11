"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.OrderItemModel = exports.PaymentStatus = exports.OrderStatus = void 0;
const mongoose_1 = require("mongoose");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["FAILED"] = "FAILED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
const orderItemSchema = new mongoose_1.Schema({
    order: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    priceAtPurchase: {
        type: Number,
        required: true,
        min: 0,
    },
}, { _id: true });
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "OrderItem" }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING,
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: "PENDING",
    },
}, { timestamps: true });
exports.OrderItemModel = (0, mongoose_1.model)("OrderItem", orderItemSchema);
exports.OrderModel = (0, mongoose_1.model)("Order", orderSchema);
//# sourceMappingURL=order.model.js.map