import { ZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

const schemaValidation = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await schema.parseAsync(data);
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default schemaValidation;
