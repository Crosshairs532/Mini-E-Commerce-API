import { model, Schema, Types } from "mongoose";
import { TOrderItem, TOrderSchema } from "./order.interface";

export enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}
const orderItemSchema = new Schema<TOrderItem>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
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
  },
  { _id: true },
);

const orderSchema = new Schema<TOrderSchema>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
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
  },
  { timestamps: true },
);

export const OrderItemModel = model<TOrderItem>("OrderItem", orderItemSchema);
export const OrderModel = model<TOrderSchema>("Order", orderSchema);
