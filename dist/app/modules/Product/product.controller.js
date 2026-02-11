"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const SendResponse_1 = require("../../utils/SendResponse");
const product_service_1 = require("./product.service");
const catchAsync_1 = require("../../utils/catchAsync");
const getAllProduct = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const { searchTerm } = req.query;
    const result = await product_service_1.productService.getAllProducts(searchTerm);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "All Product retrieved successfully!",
        data: result,
    });
});
const getSingleProduct = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const { productId } = req.params;
    const result = await product_service_1.productService.getSingleProduct(productId);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product retrieved successfully!",
        data: result,
    });
});
const createProduct = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const data = req.body;
    const createdData = await product_service_1.productService.createProduct(data);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product created successfully!",
        data: createdData,
    });
});
const updateProduct = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const { productId } = req.params;
    const result = await product_service_1.productService.updateProduct(req.body, productId);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product updated successfully!",
        data: result,
    });
});
const deleteProduct = (0, catchAsync_1.CatchAsync)(async (req, res) => {
    const { productId } = req.params;
    const result = await product_service_1.productService.deleteProduct(productId);
    return (0, SendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product deleted successfully!",
        data: result,
    });
});
exports.productController = {
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    getAllProduct,
};
//# sourceMappingURL=product.controller.js.map