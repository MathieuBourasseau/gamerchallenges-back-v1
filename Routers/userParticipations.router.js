import { Router } from "express";
import { userParticipationsController } from "../Controllers/userParticipations.controller.js";

export const userParticipationsRouter = Router();

userParticipationsRouter.get(
	"/users/:id/participations",
	userParticipationsController.getParticipationsByUser,
);
