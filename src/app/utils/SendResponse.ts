import { Response } from "express";
type TData<T> = {
  success: boolean;
  message: string;
  data: T;
};
export const sendResponse = <T>(res: Response, result: TData<T>) => {
  return res.status(200).json({
    success: result.success,
    message: result.message,
    data: result.data,
  });
};
