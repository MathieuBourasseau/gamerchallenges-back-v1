import { Router } from "express";
import {
  userController,
  authenticationUserController,
} from "../Controllers/index.js";

import { authenticate } from "../Middlewares/index.js";
import { avatarUpload } from "../Middlewares/uploadAvatar.middleware.js";

export const userRouter = Router();

userRouter.post(
  "/users/register",
  avatarUpload.single("avatar"),
  authenticationUserController.register,
);

userRouter.post("/users/login", authenticationUserController.login);

userRouter.get("/me", authenticate, authenticationUserController.getMe);

userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:id", userController.getUserById);
userRouter.delete("/users/:id", userController.deleteUser);

userRouter.patch(
  "/users/:id",
  avatarUpload.single("avatar"),
  userController.editUserAccount,
);
