import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Challenge extends Model { }


Challenge.init(
   {
      name: {
         type: DataTypes.STRING(50),
         allowNull: false,
         unique: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
   },
   {
      sequelize, 
      modelName: "Challenge",
      tableName: "challenge", 
   }
);