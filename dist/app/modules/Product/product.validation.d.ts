import { z } from "zod";
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    price: z.ZodNumber;
    stock: z.ZodNumber;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodString>>>;
    price: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const productValidation: {
    createProductSchema: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        price: z.ZodNumber;
        stock: z.ZodNumber;
    }, z.core.$strip>;
    updateProductSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodString>>>;
        price: z.ZodOptional<z.ZodNumber>;
        stock: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
};
//# sourceMappingURL=product.validation.d.ts.map