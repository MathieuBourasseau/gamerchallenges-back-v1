import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Challenge extends Model { }

// Definition of models attributes
// These correspond to the table fields
Challenge.init(
   {
      name: {
         type: DataTypes.STRING(50), // Limit the challenge name to 50 characters
         allowNull: false, // Challenge must have a name 
         unique: false, // Name is not necessary unique
      },

      description: {
        type: DataTypes.TEXT, // No limit for the description of a challenge 
        allowNull: false, // Obligation to have a description
      }
   },
   {
      sequelize, 
      modelName: "Challenge", // Name of the model
      tableName: "challenge", // Name of the table in the database
   }
);