import { Request, Response } from "express";
import { CatchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/SendResponse";
import { authService } from "./auth.service";

const RegisterUser = CatchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.RegisterUser(body);

  sendResponse(res, {
    success: true,
    data: result,
    message: "User created successfully",
  });
});
const LoginUser = CatchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.LoginUser(body);

  sendResponse(res, {
    success: true,
    data: result,
    message: "User Logged in successfully",
  });
});

export const authController = { RegisterUser, LoginUser };
