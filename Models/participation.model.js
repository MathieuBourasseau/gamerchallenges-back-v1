import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

/**
 * Defining the Participation model by extending the Sequelize Model class.
 * This represents a user's entry (usually a video link) for a specific challenge.
 */
export class Participation extends Model { }

/**
 * Initializing the Participation model with its specific attributes.
 */
Participation.init(
   {
      // The name or headline given by the user to their entry
      title: {
         type: DataTypes.STRING(100), // Limited to 100 characters
         allowNull: false,            // Title is mandatory
         unique: false,               // Multiple participations can share the same title
      },

      // The link to the participation from youtube
      url: {
         type: DataTypes.TEXT,        // Using TEXT for long URLs
         allowNull: false,            // URL is mandatory
         unique: true,               // Prevents the same video from being submitted twice
      },
   },
   {
      // Connecting the model to the Sequelize instance
      sequelize, 
      // Internal Sequelize name
      modelName: "Participation",
      // Actual database table name
      tableName: "participation", 
   }
);