import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Game extends Model { }


Game.init(
   {
      title: {
         type: DataTypes.STRING(100),
         allowNull: false,
         unique: true,
      },

      genre: {
         type: DataTypes.STRING(50),
         allowNull: false,
         unique: false,
      },

      release_year: {
         type: DataTypes.DATE,
         allowNull: true,
      },

      cover: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
   },
   {
      sequelize, 
      modelName: "Game",
      tableName: "game", 
   }
);