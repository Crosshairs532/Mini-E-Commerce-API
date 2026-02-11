import status from "http-status";
import AppError from "../../middlewares/AppError";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const getAllProducts = async (searchParam: string | undefined) => {
  let filter: Record<string, unknown> = {};
  if (searchParam) {
    filter.$or = [
      { name: { $regex: new RegExp(searchParam, "i") } },
      { description: { $regex: new RegExp(searchParam, "i") } },
    ];
  }
  const result = await ProductModel.find(filter);
  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Something went wrong while searching product",
    );
  }
  return result;
};

const getSingleProduct = async (productId: string) => {
  const res = await ProductModel.findById(productId);
  if (!res) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }
  return res;
};
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
const updateProduct = async (
  productData: Partial<TProduct>,
  productId: string,
) => {
  // find the product
  const isProductExist = await ProductModel.findOne({ _id: productId });
  if (!isProductExist) {
    throw new AppError(status.NOT_FOUND, "Product Not found");
  }
  // check if product is deleted or not
  if (isProductExist.isDeleted) {
    throw new AppError(status.GONE, "Product is Deleted!");
  }
  // Update the product
  const res = await ProductModel.findOneAndUpdate(
    { _id: productId },
    productData,
    {
      new: true,
    },
  );
  if (!res) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to update");
  }
  return res;
};

const deleteProduct = async (productId: string) => {
  try {
    const res = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      {
        isDeleted: true,
      },
      { new: true },
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const productService = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
