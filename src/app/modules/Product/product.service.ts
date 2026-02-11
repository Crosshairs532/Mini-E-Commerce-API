import status from "http-status";
import AppError from "../../middlewares/AppError";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

// const getAllProducts = async (
//   searchParam: string | null,
// ) => {
//   let filter: Record<string, unknown> = {}
//   if (searchParam) {
//     filter.$or = [
//       { name: { $regex: new RegExp(searchParam, 'i') } },
//       { description: { $regex: new RegExp(searchParam, 'i') } },

//       ],
//     }
//   console.log(filter);

//   try {
//     const result = await ProductModel.find(filter);
//     return result;
//   } catch (error) {
//     return error;
//   }
// };

const createProduct = async (product: TProduct) => {
  const res = await ProductModel.create(product);
  if (!res) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to create product",
    );
  }

  return res;
};
const updateProduct = () => {};
const deleteProduct = () => {};

export const productService = {
  //   getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
