import argon2 from "argon2";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { User } from "../Models/index.js";
import { loginUserSchema } from "../Schemas/index.js";
import { registerUserSchema } from "../Schemas/index.js";

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
        return res.status(400).json({
          error: "You must accept the privacy policy.",
        });
      }

      // Check if an account already exists with this email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: "Email already in use." });
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
      return res.status(201).json({
        message: "Account successfully created",
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
      console.error("Register error:", error);
      res.status(500).json({ error: "Server error" });
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
        return res.status(404).json({ error: "User does not exist" });
      }

      // Verify the password using Argon2
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(403).json({ error: "Incorrect password" });
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
      res.status(200).json({
        message: "User successfully logged in",
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
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  // =========================================================
  // GET ME — Return the authenticated user's profile
  // =========================================================
  async getMe(req, res) {
    try {
      // Retrieve the user using the ID injected by the auth middleware
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ["id", "username", "email", "avatar", "role"],
      });

      // If no user found, return error
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return user profile
      res.status(200).json(user);
    } catch (error) {
      console.error("getMe error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
};
