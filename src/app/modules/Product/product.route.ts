import express from "express";
import Auth from "../../middlewares/auth";
import { productValidation } from "./product.validation";
import schemaValidation from "../../middlewares/SchemaValidation";
import { productController } from "./product.controller";
const productRoutes = express.Router();

productRoutes.get(
  "/",
  Auth("admin", "customer"),
  productController.getAllProduct,
);
productRoutes.get(
  "/:productId",
  Auth("admin", "customer"),
  productController.getSingleProduct,
);
productRoutes.post(
  "/create-product",
  Auth("admin"),
  schemaValidation(productValidation.createProductSchema),
  productController.createProduct,
);
productRoutes.patch(
  "/product-update/:productId",
  Auth("admin"),
  schemaValidation(productValidation.updateProductSchema),
  productController.updateProduct,
);
productRoutes.patch(
  "/product-delete/:productId",
  Auth("admin"),
  productController.deleteProduct,
);

export default productRoutes;
