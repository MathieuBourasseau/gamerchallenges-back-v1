import { Router } from "express";
import { gameController } from "../Controllers/game.controller.js";

export const gameRouter = Router();

gameRouter.get("/games", gameController.getAllGames);
gameRouter.get("/games/:id", gameController.getGameById);
