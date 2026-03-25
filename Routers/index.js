import { Router } from "express";
import { homeRouter } from "./home.router.js";
import { challengeRouter } from "./challenge.router.js";
import { gameRouter } from "./game.router.js";
import { userRouter } from "./user.router.js";
import { contactRouter } from "./contact.router.js";
import { rankingRouter } from "./ranking.router.js";
import { participationRouter } from "./participation.router.js";
import { searchRouter } from "./search.router.js";
import { userVotesRouter } from "./userVotes.routes.js";

export const apiRouter = Router();

apiRouter.use(searchRouter);
apiRouter.use(homeRouter);
apiRouter.use(challengeRouter);
apiRouter.use(gameRouter);
apiRouter.use(userRouter);
apiRouter.use(contactRouter);
apiRouter.use(rankingRouter);
apiRouter.use(participationRouter);
apiRouter.use(userVotesRouter);
