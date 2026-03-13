import Joi from "joi";

// Validation schema for the login form

export const loginUserSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string()
    .trim()
    .min(6)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    ),
});
