import { Router } from "express";
import { gameController } from "../Controllers/game.controller.js";
import { validId } from "../Middlewares/index.js";

export const gameRouter = Router();

// Route to show all games
gameRouter.get("/games", gameController.getAllGames);

// Route to show the details of one game
gameRouter.get("/games/:id", validId , gameController.getGameById);
