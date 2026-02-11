"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _1 = __importDefault(require("."));
const auth_routes_1 = __importDefault(require("../modules/Auth/auth.routes"));
const product_route_1 = __importDefault(require("../modules/Product/product.route"));
const cart_routes_1 = require("../modules/Cart/cart.routes");
const order_route_1 = require("../modules/Order/order.route");
const router = express_1.default.Router();
const allRoutes = [
    {
        path: "/",
        route: _1.default,
    },
    {
        path: "/auth",
        route: auth_routes_1.default,
    },
    {
        path: "/product",
        route: product_route_1.default,
    },
    {
        path: "/cart",
        route: cart_routes_1.cartRoutes,
    },
    {
        path: "/order",
        route: order_route_1.orderRoutes,
    },
];
for (const route of allRoutes) {
    router.use(route.path, route?.route);
}
exports.default = router;
//# sourceMappingURL=route.js.map