"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const product_model_1 = require("./product.model");
const getAllProducts = async (searchParam) => {
    let filter = {};
    if (searchParam) {
        filter.$or = [
            { name: { $regex: new RegExp(searchParam, "i") } },
            { description: { $regex: new RegExp(searchParam, "i") } },
        ];
    }
    const result = await product_model_1.ProductModel.find(filter);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Something went wrong while searching product");
    }
    return result;
};
const getSingleProduct = async (productId) => {
    const res = await product_model_1.ProductModel.findById(productId);
    if (!res) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    return res;
};
const createProduct = async (product) => {
    const res = await product_model_1.ProductModel.create(product);
    if (!res) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to create product");
    }
    return res;
};
const updateProduct = async (productData, productId) => {
    // find the product
    const isProductExist = await product_model_1.ProductModel.findOne({ _id: productId });
    if (!isProductExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product Not found");
    }
    // check if product is deleted or not
    if (isProductExist.isDeleted) {
        throw new AppError_1.default(http_status_1.default.GONE, "Product is Deleted!");
    }
    // Update the product
    const res = await product_model_1.ProductModel.findOneAndUpdate({ _id: productId }, productData, {
        new: true,
    });
    if (!res) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to update");
    }
    return res;
};
const deleteProduct = async (productId) => {
    try {
        const res = await product_model_1.ProductModel.findByIdAndUpdate({ _id: productId }, {
            isDeleted: true,
        }, { new: true });
        return res;
    }
    catch (err) {
        return err;
    }
};
exports.productService = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.service.js.map