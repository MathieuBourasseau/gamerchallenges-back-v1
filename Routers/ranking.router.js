import { Router } from "express";
import { rankingController } from "../Controllers/ranking.controller.js";

export const rankingRouter = Router();

rankingRouter.get(
	"/ranking/participations",
	rankingController.rankByParticipations,
);
rankingRouter.get("/ranking/votes", rankingController.rankByVotes);
