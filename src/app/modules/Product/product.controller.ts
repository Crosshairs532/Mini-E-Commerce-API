import status from "http-status";
import { sendResponse } from "../../utils/SendResponse";
import { productService } from "./product.service";
import { CatchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { productValidation } from "./product.validation";

const createProduct = CatchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const createdData = await productService.createProduct(data);
  return sendResponse(res, {
    success: true,
    message: "Product created successfully!",
    data: createdData,
  });
});
const updateProduct = CatchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await productService.updateProduct(
    req.body,
    productId as string,
  );
  return sendResponse(res, {
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
});

export const productController = {
  createProduct,
  updateProduct,
};
