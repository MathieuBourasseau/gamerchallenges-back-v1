import Joi from "joi";
import { checkIdSchema } from "../Schemas/index.js";

export function validId (req, res, next) {

    try {

        Joi.attempt(req.params, checkIdSchema);
        // Check in params the key "id" and converted it in number

        const idFormatted = Joi.attempt(req.params, checkIdSchema); // idFormatted contains the new id converted in number
        req.params = idFormatted // req.params takes the value of this new id converted in number for controller
        next();

    } catch (error) {

        // If "id" is invalid error message is sent
        console.error("ID invalide :", error.message);
        return res.status(400).json({ error: "L'ID est invalide."})

    }
};
