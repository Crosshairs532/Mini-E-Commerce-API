import express from "express";
import { cartController } from "./cart.controller";
import Auth from "../../middlewares/auth";

const CartRouter = express.Router();

CartRouter.use(Auth("customer"));

CartRouter.get("/", cartController.getMyCart);
CartRouter.post("/add-update", cartController.addToCart);
CartRouter.patch("/update", cartController.updateCartItem);
CartRouter.delete("/remove/:productId", cartController.removeFromCart);
CartRouter.delete("/clear", cartController.clearCart);

export const cartRoutes = CartRouter;
