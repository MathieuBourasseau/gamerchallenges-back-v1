import { Router } from "express";
import { userVotesController } from "../Controllers/userVotes.controller.js";
import { authenticate } from "../Middlewares/authenticate.middleware.js";

export const userVotesRouter = Router();

// Add a vote
userVotesRouter.post(
	"/participations/:participationId/vote",
	authenticate,
	userVotesController.addVote,
);

// Remove a vote
userVotesRouter.delete(
	"/participations/:participationId/vote",
	authenticate,
	userVotesController.removeVote,
);

// Check if user already voted
userVotesRouter.get(
	"/participations/:participationId/vote",
	authenticate,
	userVotesController.checkVote,
);
