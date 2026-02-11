import { ZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
declare const schemaValidation: (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default schemaValidation;
//# sourceMappingURL=SchemaValidation.d.ts.map