import { Router } from "express";
import { rankingController } from "../Controllers/ranking.controller";

export const rankingRouter = Router();

rankingRouter.get(
	"/ranking/participations",
	rankingController.rankByParticipations,
);
rankingRouter.get("/ranking/votes", rankingController.rankByVotes);
