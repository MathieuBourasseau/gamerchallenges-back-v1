import { Router } from "express";
import { userVotesController } from "./userVotes.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

export const userVotesRouter = Router();

// Add a vote
router.post(
	"/participations/:participationId/vote",
	authenticate,
	userVotesController.addVote,
);

// Remove a vote
router.delete(
	"/participations/:participationId/vote",
	authenticate,
	userVotesController.removeVote,
);

// Check if user already voted
router.get(
	"/participations/:participationId/vote",
	authenticate,
	userVotesController.checkVote,
);

