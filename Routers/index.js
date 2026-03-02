import { Router } from "express";
import { homeRouter } from "./home.router.js";
import { challengeRouter } from "./challenge.router.js";
import { gameRouter } from "./game.router.js";
import { userRouter } from "./user.router.js";
import { contactRouter } from "./contact.router.js";

export const apiRouter = Router();

apiRouter.use(homeRouter);
apiRouter.use(challengeRouter);
apiRouter.use(gameRouter);
apiRouter.use(userRouter);
apiRouter.use(contactRouter);
