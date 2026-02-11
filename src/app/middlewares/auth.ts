import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "./../utils/catchAsync";
import { configFiles } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../modules/user/user.model";
import AppError from "./AppError";
import status from "http-status";

// roles based authorization

const Auth = (...roles: string[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(
        status.UNAUTHORIZED,
        "You must be logged in to access this feature",
      );
    }
    // decode the token
    const decodedToken = (await jwt.verify(
      token as string,
      configFiles.jwt_secret as string,
    )) as JwtPayload;

    if (!decodedToken) {
      throw new AppError(
        status.UNAUTHORIZED,
        "You must be logged in to access this feature",
      );
    }
    // check if the user exists
    const isUserExist = await userModel.isUserExist(decodedToken?.email);
    if (!isUserExist) {
      throw new AppError(
        status.CONFLICT,
        "User with this email already exists!",
      );
    }
    // check if the usr role and given route role are same
    if (roles && !roles.includes(decodedToken?.role as string)) {
      throw new AppError(
        status.FORBIDDEN,
        "You are not authorized to access this resource",
      );
    }
    // add the user with the user
    req.user = decodedToken;

    next();
  });
};
export default Auth;
