import { model, Schema } from "mongoose";
import { TUser, UserModelType } from "./user.interface";
import { configFiles } from "../../config";
const bcrypt = require("bcrypt");
const userSchema = new Schema<TUser, UserModelType>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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

userSchema.statics.isUserExist = async function (id: string) {
  return userModel.findOne({ id }).select("+password");
};

userSchema.statics.checkPassword = async function (loginPass, storedPass) {
  return await bcrypt.compare(loginPass, storedPass);
};

export const userModel = model<TUser, UserModelType>("User", userSchema);
