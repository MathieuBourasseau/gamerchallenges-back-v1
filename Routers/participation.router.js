import { Router } from "express";
import { participationController } from "../Controllers/index.js";
import { validId } from "../Middlewares/index.js";
import { validParticipation, authenticate } from "../Middlewares/index.js";

export const participationRouter = Router();

// Route to share a participation from YouTube
participationRouter.post("/participations/share", authenticate, validParticipation, participationController.shareParticipation)

// Route to get all participations bound to a challenge
participationRouter.get("/challenges/:id/participations", validId, participationController.getParticipationsByChallenge)

// Route to get all participations of a user 
participationRouter.get("/users/:id/participations", validId, participationController.getParticipationsByUser);
