import { Router } from "express";
import { challengeController } from "../Controllers/challenge.controller.js";

export const challengeRouter = Router();

challengeRouter.get("/challenges", challengeController.getAllChallenges);
