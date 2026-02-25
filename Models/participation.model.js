import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Participation extends Model { }

Participation.init(
   {
      title: {
         type: DataTypes.STRING(100),
         allowNull: false,
         unique: false,
      },

      url: {
         type: DataTypes.TEXT,
         allowNull: true,
         unique: true,
      },
   },
   {
      sequelize, 
      modelName: "Participation",
      tableName: "participation", 
   }
);