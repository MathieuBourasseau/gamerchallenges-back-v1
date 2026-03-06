import { Router } from "express";
import { userController } from "../Controllers/user.controller.js";
import { validId } from "../Middlewares/validId.middleware.js";

export const userRouter = Router();

userRouter.get("/users/:id", userController.getUserById);
userRouter.get("/users/:id/challenges", userController.getChallengesByUser);
userRouter.get(
  "/users/:id/participations",
  validId ,
  userController.getParticipationsByUser,
);

// on ajoutera un middleware d'authentification pour les routes des users connectés plus tard...
