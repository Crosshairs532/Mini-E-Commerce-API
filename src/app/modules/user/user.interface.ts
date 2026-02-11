import { Model } from "mongoose";

export type Role = "customer" | "admin";
export interface TUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  cancellationCount: Number;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserModelType extends Model<TUser> {
  isUserExist(id: string): Promise<TUser>;
  checkPassword(loginPass: string, storedPass: string): Promise<boolean>;
}
