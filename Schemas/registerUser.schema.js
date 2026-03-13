import Joi from "joi";

// Validation schema for the registration form

export const registerUserSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string()
    .trim()
    .min(6)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    ),

  acceptPolicy: Joi.boolean().valid(true).required(),
});
