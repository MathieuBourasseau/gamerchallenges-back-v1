import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

/**
 * Defining the Game model by extending the Sequelize Model class.
 */
export class Game extends Model { }

/**
 * Initializing the Game model with its attributes and options.
 */
Game.init(
   {
      // The official name of the video game
      title: {
         type: DataTypes.STRING(100), // Varchar(100) in the database
         allowNull: false,            // This field is mandatory
         unique: true,               // Two games cannot have the same title
      },

      // The category of the game (e.g., RPG, FPS, Platformer)
      genre: {
         type: DataTypes.STRING(50),  // Varchar(50) in the database
         allowNull: false,            // This field is mandatory
         unique: false,               // Multiple games can belong to the same genre
      },

      // The date the game was officially launched
      release_year: {
         type: DataTypes.DATE,        // Date type in the database
         allowNull: true,             // This field is optional
      },

      // URL or path to the game's cover image
      cover: {
         type: DataTypes.STRING(255), // Varchar(255) for the image string/path
         allowNull: false,            // A cover image is required
      },

      // A detailed summary of the game
      description: {
        type: DataTypes.TEXT,         // Text type (longer than String) for descriptions
        allowNull: false,             // A description is required
      }
   },
   {
      // Connecting the model to the configured Sequelize instance
      sequelize, 
      // The internal name used by Sequelize
      modelName: "Game",
      // The actual name of the table in the PostgreSQL database
      tableName: "game", 
   }
);