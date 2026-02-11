import { Types } from "mongoose";
export type TOrderItem = {
    order: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
};
export type TStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type TPaymentStatus = "PENDING" | "PAID" | "FAILED";
export type TOrderSchema = {
    user: Types.ObjectId;
    items: Types.ObjectId[];
    totalAmount: number;
    status: TStatus;
    paymentStatus: TPaymentStatus;
};
//# sourceMappingURL=order.interface.d.ts.map