import { Router } from "express";
import { challengeController } from "../Controllers/challenge.controller.js";

export const challengeRouter = Router();

// Route to show all challenges
challengeRouter.get("/challenges", challengeController.getAllChallenges);

// Route to show details of one challenge 
challengeRouter.get("/challenges/:id", challengeController.getOneChallenge);
