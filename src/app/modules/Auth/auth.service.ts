import status from "http-status";
import { userModel } from "../user/user.model";
import AppError from "../../middlewares/AppError";
import { generateToken } from "./auth.utils";
import { configFiles } from "../../config";

const RegisterUser = async (userData: any) => {
  // check if user exists
  const isUserExist = await userModel.isUserExist(userData.email);
  if (isUserExist) {
    throw new AppError(status.CONFLICT, "User with this email already exists!");
  }
  //  save the user to DB and return result
  const res = await userModel.create(userData);
  return res;
};

const LoginUser = async (userData: any) => {
  // user exist
  const isUserExist = await userModel.isUserExist(userData?.email);
  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User Does not Exist! Register first");
  }
  const payload = {
    role: isUserExist.role,
    email: isUserExist.email,
  };
  // password check
  const isPasswordRight = await userModel.checkPassword(
    userData.password,
    isUserExist.password,
  );

  console.log(isPasswordRight);
  if (!isPasswordRight) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password");
  }
  // jwt token
  const accessToken = generateToken(
    payload,
    configFiles.jwt_secret as string,
    "2d",
  );
  const result = {
    name: isUserExist.name,
    ...payload,
    accessToken,
  };
  return result;
};

export const authService = { RegisterUser, LoginUser };
