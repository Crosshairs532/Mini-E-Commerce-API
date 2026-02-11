export declare const cartService: {
    getMyCart: (userEmail: string) => Promise<import("mongoose").Document<unknown, {}, import("./cart.interface").TCart, {}, import("mongoose").DefaultSchemaOptions> & import("./cart.interface").TCart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    addToCart: (userEmail: string, productId: any, quantity: number) => Promise<import("mongoose").Document<unknown, {}, import("./cart.interface").TCart, {}, import("mongoose").DefaultSchemaOptions> & import("./cart.interface").TCart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateCartItem: (userEmail: string, productId: string, quantity: number) => Promise<import("mongoose").Document<unknown, {}, import("./cart.interface").TCart, {}, import("mongoose").DefaultSchemaOptions> & import("./cart.interface").TCart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    removeFromCart: (userEmail: string, productId: string) => Promise<import("mongoose").Document<unknown, {}, import("./cart.interface").TCart, {}, import("mongoose").DefaultSchemaOptions> & import("./cart.interface").TCart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    clearCart: (userEmail: string) => Promise<import("mongoose").Document<unknown, {}, import("./cart.interface").TCart, {}, import("mongoose").DefaultSchemaOptions> & import("./cart.interface").TCart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=cart.service.d.ts.map