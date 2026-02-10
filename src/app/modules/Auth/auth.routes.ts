import express from "express";
import { authController } from "./auth.controller";
import schemaValidation from "../../middlewares/SchemaValidation";
import { userValidationSchema } from "../user/user.validation";
const authRoutes = express.Router();

authRoutes.post(
  "/registration",
  schemaValidation(userValidationSchema.userValidation),
  authController.RegisterUser,
);
authRoutes.post(
  "/login",
  schemaValidation(userValidationSchema.userLogin),
  authController.LoginUser,
);

export default authRoutes;
