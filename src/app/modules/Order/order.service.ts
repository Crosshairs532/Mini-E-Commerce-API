import mongoose from "mongoose";
import status from "http-status";
import AppError from "../../middlewares/AppError";
import { OrderItemModel, OrderModel, OrderStatus } from "./order.model";
import { CartModel } from "../Cart/cart.model";
import { ProductModel } from "../Product/product.model";
import { getUserWithEmail } from "../../utils/GetUser";
import { userModel } from "../user/user.model";

const createOrder = async (userEmail: string) => {
  const user = await getUserWithEmail(userEmail);

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "User Does not Exist!");
  }
  const userId = user?._id;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const cart = await CartModel.findOne({ user: userId }).session(session);

    if (!cart || cart.items.length === 0) {
      throw new AppError(status.BAD_REQUEST, "Cart is empty");
    }

    let totalAmount = 0;
    const order = await OrderModel.create(
      [
        {
          user: user?._id,
          totalAmount: 0,
          status: OrderStatus.PENDING,
        },
      ],
      { session },
    );
    if (!order[0]) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        "Something went wrong while ordering",
      );
    }
    const orderId = order[0]?._id as any;

    const orderItemIds = [];

    for (const item of cart.items) {
      const product = await ProductModel.findById(item.product).session(
        session,
      );

      if (!product || product.isDeleted) {
        throw new AppError(status.NOT_FOUND, "Product not found");
      }

      if (product.stock < item.quantity) {
        throw new AppError(
          status.BAD_REQUEST,
          `Insufficient stock for ${product.name}`,
        );
      }
      product.stock -= item.quantity;
      await product.save({ session });

      const priceAtPurchase = product.price;
      totalAmount += priceAtPurchase * item.quantity;

      const orderItem = await OrderItemModel.create(
        [
          {
            order: orderId,
            product: product._id,
            quantity: item.quantity,
            priceAtPurchase,
          },
        ],
        { session },
      );

      orderItemIds.push(orderItem[0]?._id!);
    }

    order[0].items = orderItemIds;
    order[0].totalAmount = totalAmount;

    await order[0]?.save({ session });

    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMyOrders = async (userEmail: string) => {
  const user = await getUserWithEmail(userEmail);
  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "User Does not Exist!");
  }
  const userId = user?._id;

  return await OrderModel.find({ user: userId }).populate("items.product");
};

const getSingleOrder = async (orderId: string, userEmail: string) => {
  const user = await getUserWithEmail(userEmail);
  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "User Does not Exist!");
  }
  const userId = user?._id;
  const order = await OrderModel.findOne({
    _id: orderId,
    user: userId,
  }).populate("items.product");

  if (!order) {
    throw new AppError(status.NOT_FOUND, "Order not found");
  }

  return order;
};

const updateOrderStatus = async (
  user: any,
  orderId: string,
  newStatus: OrderStatus,
) => {
  const order = await OrderModel.findById(orderId);

  if (!order) {
    throw new AppError(status.NOT_FOUND, "Order not found");
  }

  order.status = newStatus;
  await order.save();

  // if customer
  // check cancellation if it is customer otherwise leave it.
  if (user.role == "customer") {
    const updatedUser = await userModel.findOneAndUpdate(
      { email: user.email, cancellationCount: { $lte: 5 } },
      { $inc: { cancellationCount: 1 } },
      { returnDocument: "after" },
    );

    if (!updatedUser) {
      throw new AppError(status.FORBIDDEN, "User cancellation limit exceeded");
    }
  }

  return order;
};

export const orderService = {
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
};
