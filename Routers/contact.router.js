import { Router } from "express";
import { checkMessage } from "../Middlewares/index.js";

// Router to handle contact request 
export const contactRouter = Router();

// Post request protected by newMessage schema
contactRouter.post("/contact", checkMessage , contactController.sendMessage)