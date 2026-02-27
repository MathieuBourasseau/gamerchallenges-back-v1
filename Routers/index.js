import { Router } from "express";
import { homeRouter } from "./home.router.js";
import { challengeRouter } from "./challenge.router.js";
import { gameRouter } from "./game.router.js";

export const apiRouter = Router();

apiRouter.use(homeRouter);
apiRouter.use(challengeRouter);
apiRouter.use(gameRouter);
