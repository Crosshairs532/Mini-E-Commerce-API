import express from "express";
import Auth from "../../middlewares/auth";
import { productValidation } from "./product.validation";
import schemaValidation from "../../middlewares/SchemaValidation";
import { productController } from "./product.controller";
const productRoutes = express.Router();

productRoutes.get("/", Auth("admin"));
productRoutes.post(
  "/create-product",
  Auth("admin"),
  schemaValidation(productValidation.createProductSchema),
  productController.createProduct,
);
productRoutes.patch(
  "/create-update/:productId",
  Auth("admin"),
  schemaValidation(productValidation.updateProductSchema),
  productController.updateProduct,
);
productRoutes.delete("/create-delete", Auth("admin"));

export default productRoutes;
