import { model, Schema } from "mongoose";
import { TUser, UserModelType } from "./user.interface";
import { configFiles } from "../../config";
import bcrypt from "bcryptjs";

const userSchema = new Schema<TUser, UserModelType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// hash password before saving
userSchema.pre("save", async function () {
  const user = this;

  console.log(user);
  try {
    const hash = await bcrypt.hash(
      user.password,
      Number(configFiles.bcrypt_salt_rounds),
    );
    user.password = hash;
  } catch (err: any) {
    throw err;
  }
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  return userModel.findOne({ email }).select("+password");
};

userSchema.statics.checkPassword = async function (loginPass, storedPass) {
  return await bcrypt.compare(loginPass, storedPass);
};

export const userModel = model<TUser, UserModelType>("User", userSchema);
