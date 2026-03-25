import { Router } from "express";
import { gameController } from "../Controllers/game.controller.js";
import { validId } from "../Middlewares/validId.middleware.js";

export const gameRouter = Router();

gameRouter.get("/games", gameController.getAllGames);
gameRouter.get("/games/:id", validId, gameController.getGameById);
