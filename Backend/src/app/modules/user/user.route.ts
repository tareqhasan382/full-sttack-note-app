import express from "express";
import { UserController } from "./user.controller";
import { authVerify } from "../../middlewares/authVerify";
import { ENUM_ROLE } from "./user.interface";
const router = express.Router();
router.get(
  "/userProfile",
  authVerify(ENUM_ROLE.USER),
  UserController.userProfile
);
//   router.get('/user/:id', UserController.getUser),
//   router.patch('/user/:id', UserController.updateUser)
router.post("/login", UserController.login);
router.post("/signup", UserController.createUser);
export const UserRoute = router;
