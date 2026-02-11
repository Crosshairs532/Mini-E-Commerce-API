import mongoose from "mongoose";
import { OrderStatus } from "./order.model";
export declare const orderService: {
    createOrder: (userEmail: string) => Promise<mongoose.Document<unknown, {}, import("./order.interface").TOrderSchema, {}, mongoose.DefaultSchemaOptions> & import("./order.interface").TOrderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getMyOrders: (userEmail: string) => Promise<(mongoose.Document<unknown, {}, import("./order.interface").TOrderSchema, {}, mongoose.DefaultSchemaOptions> & import("./order.interface").TOrderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSingleOrder: (orderId: string, userEmail: string) => Promise<mongoose.Document<unknown, {}, import("./order.interface").TOrderSchema, {}, mongoose.DefaultSchemaOptions> & import("./order.interface").TOrderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateOrderStatus: (user: any, orderId: string, newStatus: OrderStatus) => Promise<mongoose.Document<unknown, {}, import("./order.interface").TOrderSchema, {}, mongoose.DefaultSchemaOptions> & import("./order.interface").TOrderSchema & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=order.service.d.ts.map