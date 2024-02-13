/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import UserModel from "./user.model";
import bcrypt from "bcrypt";
import config from "../../../config";
const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log("data:", data);
  try {
    const isExist = await UserModel.findOne({ email: data.email });
    // console.log("User:", isExist);
    if (isExist) {
      return res.json({
        status: "false",
        message: "User Already Exist.",
        data: isExist?.email,
      });
    }

    const result = await UserModel.create(data);
    return res.json({
      status: "true",
      message: "User Created Successfully.",
      data: result,
    });
  } catch (error) {
    return res.json({ status: "false", message: "Failed to create user." });
  }
});
///admin/login
const login = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("data:", data);
    if (!data.email || !data.password) {
      return res.json({ status: "false", message: "Invalid credendials" });
    }
    if (data.email && data.password) {
      const isExist = await UserModel.findOne({ email: data?.email }).select(
        "password email role"
      );
      //console.log("isExist:", isExist);
      if (!isExist) {
        return res.json({ status: "false", message: "User not Found !" });
      }
      // check match password
      const isMatchPassword = await bcrypt.compare(
        data.password,
        isExist?.password
      );
      //  console.log("isMatchPassword:", isMatchPassword);
      if (!isMatchPassword) {
        return res.json({ status: "false", message: "Password is incorrect" });
      }
      // create jwt token
      const accessToken = jwt.sign(
        { userId: isExist._id, role: isExist.role, email: isExist.email },
        config.jwt.secret as Secret,
        { expiresIn: config.jwt.expires_in }
      ); // config.database_url as string
      return res.status(200).json({
        status: "true",
        message: "user logged in successfully",
        token: accessToken,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Something went to wrong" });
  }
});
const userProfile = catchAsync(async (req: Request, res: Response) => {
  if (req.user) {
    const { email } = req.user;
    const result = await UserModel.findOne({ email: email });
    return res.json({ data: result });
  }
});
export const UserController = {
  createUser,
  login,
  userProfile,
};
