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
userRouter.patch(
  "/me",
  authenticate,
  avatarUpload.single("avatar"),
  userController.updateMe,
);
userRouter.patch(
  "/me",
  authenticate,
  avatarUpload.single("avatar"),
  userController.updateMe,
);
userRouter.patch(
  "/me/change-password",
  authenticate,
  userController.changePassword,
);
userRouter.delete("/me", authenticate, userController.deleteMe);

// userRouter.get("/users", userController.getAllUsers);
// userRouter.get("/users/:id", userController.getUserById);
// userRouter.delete("/users/:id", userController.deleteUser);

// userRouter.patch(
//   "/users/:id",
//   avatarUpload.single("avatar"),
//   userController.editUserAccount,
// ); these routes are made for the admin side to scale up the project
