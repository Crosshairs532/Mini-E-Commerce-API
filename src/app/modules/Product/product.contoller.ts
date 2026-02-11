import status from "http-status";
import { sendResponse } from "../../utils/SendResponse";
import { productService } from "./product.service";
import { CatchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";

const createProduct = CatchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const createdData = await productService.createProduct(data);
  return sendResponse(res, {
    success: true,
    message: "Product created successfully!",
    data: createdData,
  });
});

export const productController = {
  createProduct,
};
