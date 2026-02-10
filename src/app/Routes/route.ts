import express from "express";
import homeRoute from ".";

const router = express.Router();

const allRoutes = [
  {
    path: "/",
    route: homeRoute,
  },
];

for (const route of allRoutes) {
  router.use(route.path, route?.route);
}

export default router;
