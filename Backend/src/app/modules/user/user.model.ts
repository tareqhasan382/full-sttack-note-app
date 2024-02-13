import { Schema, model } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// User.create() / User.save()
userSchema.pre("save", async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

const UserModel = model<IUser, IUserModel>("User", userSchema);

export default UserModel;
