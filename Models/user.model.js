import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

/**
 * Defining the User model by extending the Sequelize Model class.
 * This handles authentication, profile data, and access control.
 */
export class User extends Model { }

/**
 * Initializing the User model with its attributes and constraints.
 */
User.init(
   {
      // The public display name for the user
      username: {
         type: DataTypes.STRING(50), 
         allowNull: false,            // Username is mandatory
         unique: false,               // Different users can have the same username if needed
      },

      // The unique identifier for login and communication
      email: {
         type: DataTypes.STRING,
         allowNull: false,            // Email is mandatory
         unique: true,               // Prevents duplicate accounts with the same email
      },

      // The securely hashed password (e.g., using Argon2)
      password: {
         type: DataTypes.STRING(255), // Varchar(255) to accommodate long hash strings
         allowNull: false,
      },

      // Path or URL to the user's profile picture
      avatar: {
         type: DataTypes.STRING(255),
         allowNull: true              // Users can have a default avatar if none is uploaded
      },

      // Optional user preference to show on their profile
      favouriteGame: {
         type: DataTypes.STRING(100),
         allowNull: true
      },

      // Social media links (using TEXT for potentially long URLs)
      twitch: {
         type: DataTypes.TEXT,
         allowNull: true
      },

      youtube: {
         type: DataTypes.TEXT,
         allowNull: true
      },

      discord: {
         type: DataTypes.TEXT,
         allowNull: true
      },

      // Management flag to restrict access for rule-breakers
      isBanned: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,         // Not banned by default
         allowNull: false
      },

      // Role-based access control (RBAC)
      role: {
         // Restricts values to a specific set: "user" or "admin"
         type: DataTypes.ENUM(["user", "admin"]), 
         allowNull: false,
         defaultValue: "user",        // New users are standard users by default
      },
   },
   {
      // Connecting the model to the Sequelize instance
      sequelize,
      // Internal Sequelize name
      modelName: "User",
      // Actual database table name
      tableName: "user",
   }
);