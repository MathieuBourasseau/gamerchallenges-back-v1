import Joi from "joi";

// Validation schema for the login form
export const loginUserSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Veuillez fournir une adresse email valide.',
    'any.required': 'L\'adresse email est obligatoire.',
    'string.empty': 'L\'adresse email ne peut pas être vide.'
  }),

  password: Joi.string()
    .trim()
    .min(6)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .messages({
      // Messages to not show the joi object error by default that contain sensitive data
      'string.pattern.base': 'L\'email ou le mot de passe est incorrect.',
      'string.min': 'L\'email ou le mot de passe est incorrect.',
      'any.required': 'Le mot de passe est obligatoire.',
      'string.empty': 'Le mot de passe ne peut pas être vide.'
    }),
});