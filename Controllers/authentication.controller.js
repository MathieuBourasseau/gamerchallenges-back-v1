import argon2 from "argon2";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { User } from "../Models/index.js";
import { loginUserSchema } from "../Schemas/index.js";
import { registerUserSchema } from "../Schemas/index.js";
import { httpStatusCodes, responseMessages } from "../utils/http-status-code.js";

export const authenticationUserController = {
  // =========================================================
  // REGISTER — Create a new user account
  // =========================================================
  async register(req, res) {
    try {
      // Validate incoming data using Joi schema
      const { username, email, password, acceptPolicy } = Joi.attempt(
        req.body,
        registerUserSchema,
      );

      // Ensure the user accepted the privacy policy (GDPR compliance)
      if (!acceptPolicy) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          status: responseMessages[httpStatusCodes.BAD_REQUEST],
          error: "Vous devez accepter la politique de traitement des données.",
        });
      }

      // Check if an account already exists with this email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(httpStatusCodes.CONFLICT).json({
          status: httpStatusCodes.CONFLICT,
          error: "Cet email existe déjà."
        });
      }

      // Hash the password securely using Argon2
      const hashedPassword = await argon2.hash(password);

      // Create the new user in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        avatar: req.file ? req.file.path : null, //ternary operator to handle optional avatar upload
      });

      // Generate a JWT for authentication
      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      // Send response back to the client
      return res.status(httpStatusCodes.CREATED).json({
        message: "Création du compte réussie",
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
        },
      });
    } catch (error) {
      console.error("Register error:", error.details[0].message);
      res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: responseMessages[httpStatusCodes.SERVER_ERROR]
      });
    }
  },

  // =========================================================
  // LOGIN — Authenticate an existing user
  // =========================================================
  async login(req, res) {
    try {
      // Validate incoming data
      const { email, password } = Joi.attempt(req.body, loginUserSchema);

      // Look for a user with this email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(httpStatusCodes.NOT_FOUND).json({
          status: httpStatusCodes.NOT_FOUND,
          error: "Cet utilisateur n'existe pas."
        });
      }

      // Verify the password using Argon2
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(httpStatusCodes.FORBIDDEN).json({
          status: httpStatusCodes.FORBIDDEN,
          error: "Mot de passe incorrect"
        });
      }

      // Generate a JWT
      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      // Send response back to the client
      res.status(httpStatusCodes.OK).json({
        message: "Connexion de l'utilisateur réussie",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      if (error.isJoi) {
        console.error("Erreur de format (Login) :", error.details[0].message);
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          status: httpStatusCodes.BAD_REQUEST,
          error: error.details[0].message
        });
      }
    }
  },

  // =========================================================
  // GET ME — Return the authenticated user's profile
  // =========================================================
  async getMe(req, res) {
    try {
      // Fetch user by ID from JWT
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: [
          "id",
          "username",
          "email",
          "avatar",
          "role",
          "favouriteGame",
          "twitch",
          "youtube",
          "discord",
        ],
      });

      if (!user) {
        return res.status(httpStatusCodes.NOT_FOUND).json({
          status: httpStatusCodes.NOT_FOUND,
          error: "Cet utilisateur n'existe pas."
        });
      }

      // Build public avatar URL
      let avatarUrl = null;
      if (user.avatar) {
        avatarUrl = `${req.protocol}://${req.get("host")}/${user.avatar}`;
      }

      // Return user with full avatar URL
      res.status(httpStatusCodes.OK).json({
        status: httpStatusCodes.OK,
        ...user.toJSON(),
        avatar: avatarUrl,
      });
    } catch (error) {
      console.error("getMe error:", error);
      res.status(httpStatusCodes.SERVER_ERROR).json({
        status: httpStatusCodes.SERVER_ERROR,
        error: responseMessages[httpStatusCodes.SERVER_ERROR]
      });
    }
  },
};
