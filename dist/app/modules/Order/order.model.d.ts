import { Types } from "mongoose";
import { TOrderItem, TOrderSchema } from "./order.interface";
export declare enum OrderStatus {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED"
}
export declare const OrderItemModel: import("mongoose").Model<TOrderItem, {}, {}, {}, import("mongoose").Document<unknown, {}, TOrderItem, {}, import("mongoose").DefaultSchemaOptions> & TOrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TOrderItem>;
export declare const OrderModel: import("mongoose").Model<TOrderSchema, {}, {}, {}, import("mongoose").Document<unknown, {}, TOrderSchema, {}, import("mongoose").DefaultSchemaOptions> & TOrderSchema & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TOrderSchema>;
//# sourceMappingURL=order.model.d.ts.map