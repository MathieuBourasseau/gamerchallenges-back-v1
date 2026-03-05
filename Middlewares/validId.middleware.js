import Joi from "joi";
import { checkIdSchema } from "../Schemas/index.js";


export function validId (req, res, next) {

    try {

        Joi.attempt(req.params, checkIdSchema);
        next();
        
    } catch (error) {
        
        console.error("ID invalide :", error.message);
        return res.status(400).json({ error: "L'ID est invalide."})

    }
};