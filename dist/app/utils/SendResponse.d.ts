import { Response } from "express";
type TData<T> = {
    success: boolean;
    message: string;
    data: T;
};
export declare const sendResponse: <T>(res: Response, result: TData<T>) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=SendResponse.d.ts.map