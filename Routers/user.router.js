import { Router } from "express";
import { userController } from "../Controllers/user.controller.js";
import { validId } from "../Middlewares/validId.middleware.js";
import avatarUpload from "../Middlewares/uploadAvatar.middleware.js";

export const userRouter = Router();

userRouter.get("/users/:id", userController.getUserById);
userRouter.delete("/users/:id", userController.deleteUser);
userRouter.patch(
	"/users/:id",
	avatarUpload.single("avatar"),
	userController.editUserAccount,
);

// on ajoutera un middleware d'authentification pour les routes des users connectés plus tard...
