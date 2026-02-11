import express from "express";
import homeRoute from ".";
import authRoutes from "../modules/Auth/auth.routes";
import productRoutes from "../modules/Product/product.route";

const router = express.Router();

const allRoutes = [
  {
    path: "/",
    route: homeRoute,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
];

for (const route of allRoutes) {
  router.use(route.path, route?.route);
}

export default router;
