import Joi from "joi";
import { newMessage } from "../Schemas/index.js";

export function checkMessage(req, res, next) {

    try {

        // Checking data sent by front from the form
        Joi.attempt(req.body,newMessage)

        // If the request body is valid we continue
        next();
        
    } catch (error) {
        
        console.error(error.message);
        return res.status(400).json({ error: "Le format des données envoyé n'est pas valide."})

    }
}