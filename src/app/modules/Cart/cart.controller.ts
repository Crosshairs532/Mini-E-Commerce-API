import { Request, Response } from "express";
import { CatchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/SendResponse";
import { cartService } from "./cart.service";

const getMyCart = CatchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email;
  const result = await cartService.getMyCart(userEmail);
  return sendResponse(res, {
    success: true,
    message: "Cart retrieved successfully!",
    data: result,
  });
});

const addToCart = CatchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email;
  const { productId, quantity } = req.body;
  const result = await cartService.addToCart(userEmail, productId, quantity);

  return sendResponse(res, {
    success: true,
    message: "Product added to cart successfully!",
    data: result,
  });
});

const updateCartItem = CatchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email;
  const { productId, quantity } = req.body;

  const result = await cartService.updateCartItem(
    userEmail,
    productId,
    quantity,
  );

  return sendResponse(res, {
    success: true,
    message: "Cart updated successfully!",
    data: result,
  });
});
const removeFromCart = CatchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email;
  const { productId } = req.params;

  const result = await cartService.removeFromCart(
    userEmail,
    productId as string,
  );

  return sendResponse(res, {
    success: true,
    message: "Product removed from cart successfully!",
    data: result,
  });
});
const clearCart = CatchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email;
  const result = await cartService.clearCart(userEmail);
  return sendResponse(res, {
    success: true,
    message: "Cart cleared successfully!",
    data: result,
  });
});

export const cartController = {
  getMyCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
