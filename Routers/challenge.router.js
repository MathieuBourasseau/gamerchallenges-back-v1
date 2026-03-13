import { Router } from "express";
import { challengeController } from "../Controllers/challenge.controller.js";
import { validId } from "../Middlewares/validId.middleware.js";

export const challengeRouter = Router();

challengeRouter.get("/challenges", challengeController.getAllChallenges);

challengeRouter.get("/challenges/:id", validId, challengeController.getChallengeById);
