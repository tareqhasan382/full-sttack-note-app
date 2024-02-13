import { Model } from "mongoose";

export type IUser = {
  _id?: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  password: string;

  role: "admin" | "seller" | "user";
};
export type IUserModel = Model<IUser, Record<string, unknown>>;

export enum ENUM_ROLE {
  ADMIN = "admin",
  USER = "user",
  SELLER = "seller",
}
