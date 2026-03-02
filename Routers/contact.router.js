import { Router } from "express";
import { newMessage } from "../Schemas/index.js";

// Router to handle contact request 
export const contactRouter = Router();

// Post request protected by newMessage schema
contactRouter.post("/contact", newMessage, contactController.sendMessage)