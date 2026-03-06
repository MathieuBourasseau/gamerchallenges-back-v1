import Joi from "joi";

// Validation schema for id
export const checkIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});