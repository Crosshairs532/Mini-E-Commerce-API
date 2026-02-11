"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const cart_model_1 = require("./cart.model");
const product_model_1 = require("../Product/product.model");
const GetUser_1 = require("../../utils/GetUser");
const getMyCart = async (userEmail) => {
    // get user
    const user = await (0, GetUser_1.getUserWithEmail)(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist!");
    }
    let cart = await cart_model_1.CartModel.findOne({ user: user?._id }).populate("items.product");
    if (!cart) {
        cart = await cart_model_1.CartModel.create({
            user: user?._id,
            items: [],
        });
    }
    return cart;
};
const addToCart = async (userEmail, productId, quantity) => {
    const user = await (0, GetUser_1.getUserWithEmail)(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist!");
    }
    //  Fetch Product Information
    const product = await product_model_1.ProductModel.findById(productId);
    if (!product || product.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    // Check stock
    if (product.stock < quantity) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Insufficient stock");
    }
    // update the cart
    let cart = await cart_model_1.CartModel.findOne({ user: user?._id });
    if (!cart) {
        cart = await cart_model_1.CartModel.create({
            user: user?._id,
            items: [{ product: productId, quantity }],
        });
        return cart;
    }
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    // increase the quantity with the matching product
    // else add new items
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    return cart;
};
const updateCartItem = async (userEmail, productId, quantity) => {
    const user = await (0, GetUser_1.getUserWithEmail)(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist!");
    }
    const cart = await cart_model_1.CartModel.findOne({ user: user?._id });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    const item = cart.items.find((item) => item.product.toString() == productId);
    if (!item) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found in cart");
    }
    // extract the product that has more than 0 quantity, then update the array
    if (quantity <= 0) {
        cart.items = cart.items.filter((i) => i.product.toString() != productId);
    }
    else {
        item.quantity = quantity;
    }
    await cart.save();
    return cart;
};
const removeFromCart = async (userEmail, productId) => {
    const user = await (0, GetUser_1.getUserWithEmail)(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist!");
    }
    const cart = await cart_model_1.CartModel.findOne({ user: user?._id });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    // removing the product from the Array
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    return cart;
};
const clearCart = async (userEmail) => {
    const user = await (0, GetUser_1.getUserWithEmail)(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist!");
    }
    const cart = await cart_model_1.CartModel.findOne({ user: user?._id });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    cart.items = [];
    await cart.save();
    return cart;
};
exports.cartService = {
    getMyCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
//# sourceMappingURL=cart.service.js.map