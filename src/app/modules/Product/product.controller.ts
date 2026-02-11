import status from "http-status";
import { sendResponse } from "../../utils/SendResponse";
import { productService } from "./product.service";
import { CatchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { productValidation } from "./product.validation";

const getAllProduct = CatchAsync(async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  const result = await productService.getAllProducts(searchTerm as string);
  return sendResponse(res, {
    success: true,
    message: "All Product retrieved successfully!",
    data: result,
  });
});
const getSingleProduct = CatchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await productService.getSingleProduct(productId as string);
  return sendResponse(res, {
    success: true,
    message: "Product retrieved successfully!",
    data: result,
  });
});
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
const deleteProduct = CatchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await productService.deleteProduct(productId as string);
  return sendResponse(res, {
    success: true,
    message: "Product deleted successfully!",
    data: result,
  });
});

export const productController = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProduct,
};
