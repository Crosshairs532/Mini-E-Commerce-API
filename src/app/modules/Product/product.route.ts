import express from "express";
import Auth from "../../middlewares/auth";
const productRoutes = express.Router();

productRoutes.get("/", Auth("admin"));
productRoutes.post("/create-product", Auth("admin"));
productRoutes.patch("/create-update", Auth("admin"));
productRoutes.delete("/create-delete", Auth("admin"));

export default productRoutes;
