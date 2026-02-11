import mongoose from "mongoose";
import { TerrorSource, TGenericErrorResponse } from "../interface/error";
import { ZodError } from "zod";
export declare const handleCastError: (err: mongoose.Error.CastError) => TGenericErrorResponse;
export declare const handleDuplicateError: (err: any) => {
    statusCode: number;
    message: string;
    errorSource: TerrorSource;
};
export declare const handleValidationError: (err: mongoose.Error.ValidationError) => {
    statusCode: number;
    message: string;
    errorSource: TerrorSource;
};
export declare const handleZodError: (err: ZodError) => {
    statusCode: number;
    message: string;
    errorSource: {
        path: PropertyKey | undefined;
        message: string;
    }[];
};
//# sourceMappingURL=index.d.ts.map