import Joi from "joi";

// Validation schema for message sent from contact form 
export const newMessage = Joi.object({
    name: Joi.string().trim().min(2).required(),
    email: Joi.string().trim().email.required(),
    message: Joi.string().trim().min(5).required,
});