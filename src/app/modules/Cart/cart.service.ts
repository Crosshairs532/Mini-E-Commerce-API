import status from "http-status";
import AppError from "../../middlewares/AppError";
import { CartModel } from "./cart.model";
import { ProductModel } from "../Product/product.model";
import { userModel } from "../user/user.model";
import { getUserWithEmail } from "../../utils/GetUser";

const getMyCart = async (userEmail: string) => {
  // get user
  const user = await getUserWithEmail(userEmail);

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "User Does not Exist!");
  }
  let cart = await CartModel.findOne({ user: user?._id }).populate(
    "items.product",
  );

  if (!cart) {
    cart = await CartModel.create({
      user: user?._id,
      items: [],
    });
  }

  return cart;
};

const addToCart = async (
  userEmail: string,
  productId: any,
  quantity: number,
) => {
  const user = await getUserWithEmail(userEmail);

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "User Does not Exist!");
  }
  //  Fetch Product Information
  const product = await ProductModel.findById(productId);
  if (!product || product.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  // Check stock
  if (product.stock < quantity) {
    throw new AppError(status.BAD_REQUEST, "Insufficient stock");
  }
  // update the cart
  let cart = await CartModel.findOne({ user: user?._id });
  if (!cart) {
    cart = await CartModel.create({
      user: user?._id,
      items: [{ product: productId, quantity }],
    });
    return cart;
  }
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );
  // increase the quantity with the matching product
  // else add new items
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  return cart;
};

const updateCartItem = async (
  userEmail: string,
  productId: string,
  quantity: number,
) => {
  const user = await getUserWithEmail(userEmail);
  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "User Does not Exist!");
  }
  const cart = await CartModel.findOne({ user: user?._id });
  if (!cart) {
    throw new AppError(status.NOT_FOUND, "Cart not found");
  }
  const item = cart.items.find((item) => item.product.toString() == productId);
  if (!item) {
    throw new AppError(status.NOT_FOUND, "Product not found in cart");
  }
  // extract the product that has more than 0 quantity, then update the array
  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.product.toString() != productId);
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  return cart;
};

const removeFromCart = async (userEmail: string, productId: string) => {
  const user = await getUserWithEmail(userEmail);

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "User Does not Exist!");
  }
  const cart = await CartModel.findOne({ user: user?._id });

  if (!cart) {
    throw new AppError(status.NOT_FOUND, "Cart not found");
  }

  // removing the product from the Array
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();
  return cart;
};

const clearCart = async (userEmail: string) => {
  const user = await getUserWithEmail(userEmail);

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "User Does not Exist!");
  }
  const cart = await CartModel.findOne({ user: user?._id });

  if (!cart) {
    throw new AppError(status.NOT_FOUND, "Cart not found");
  }

  cart.items = [];
  await cart.save();

  return cart;
};

export const cartService = {
  getMyCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
