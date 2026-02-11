import { z } from "zod";
export declare const userValidationSchema: {
    userValidation: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        role: z.ZodEnum<{
            customer: "customer";
            admin: "admin";
        }>;
    }, z.core.$strip>;
    userLogin: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=user.validation.d.ts.map