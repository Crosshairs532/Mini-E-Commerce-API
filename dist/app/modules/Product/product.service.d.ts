import { TProduct } from "./product.interface";
export declare const productService: {
    getAllProducts: (searchParam: string | undefined) => Promise<(import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSingleProduct: (productId: string) => Promise<import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    createProduct: (product: TProduct) => Promise<import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProduct: (productData: Partial<TProduct>, productId: string) => Promise<import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteProduct: (productId: string) => Promise<unknown>;
};
//# sourceMappingURL=product.service.d.ts.map