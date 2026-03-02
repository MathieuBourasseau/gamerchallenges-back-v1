import { Router } from "express";
import { homeController } from "../Controllers/home.controller.js";

export const homeRouter = Router();

homeRouter.get("/", homeController.getBestParticipations);
