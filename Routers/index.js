import { Router } from "express";
import { gameRouter } from "./game.router.js";

export const apiRouter = Router();

apiRouter.use(gameRouter);
