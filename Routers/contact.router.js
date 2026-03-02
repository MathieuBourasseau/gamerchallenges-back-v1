import { Router } from "express";

// Router to handle contact request 
export const contactRouter = Router();

contactRouter.post("/contact", contactController.sendMessage)