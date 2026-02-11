import { userModel } from "../modules/user/user.model";

export const getUserWithEmail = async (userEmail: string) => {
  return await userModel.findOne({ email: userEmail });
};
