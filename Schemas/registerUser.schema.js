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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .messages({
      // Replace the error message from the regex that contains the password
      'string.pattern.base': 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.',
      // Explain the others types of errors
      'string.min': 'Le mot de passe doit faire au moins {#limit} caractères.',
      'any.required': 'Le mot de passe est obligatoire.',
      'string.empty': 'Le mot de passe ne peut pas être vide.'
    }),

  acceptPolicy: Joi.boolean().valid(true).required(),
});