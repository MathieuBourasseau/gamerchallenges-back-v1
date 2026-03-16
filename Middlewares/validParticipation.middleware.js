import Joi from "joi";
import { participationSchema } from "../Schemas/index.js";

export function validParticipation(req, res, next) {

    try {

        req.body = Joi.attempt(req.body, participationSchema);
        next()
        
    } catch (error) {
        
        console.error(error.message);
        return res.status(400).json({ error: "Le format des données envoyées n'est pas valide."})
    }

}