import express from "express";
import Auth from "../../middlewares/auth";
import { productValidation } from "./product.validation";
import schemaValidation from "../../middlewares/SchemaValidation";
import { productController } from "./product.contoller";
const productRoutes = express.Router();

productRoutes.get("/", Auth("admin"));
productRoutes.post(
  "/create-product",
  Auth("admin"),
  schemaValidation(productValidation.createProductSchema),
  productController.createProduct,
);
productRoutes.patch("/create-update", Auth("admin"));
productRoutes.delete("/create-delete", Auth("admin"));

export default productRoutes;
