import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class User extends Model { }


User.init(
   {
      username: {
         type: DataTypes.STRING(50),
         allowNull: false,
         unique: false,
      },

      role: {
         type: DataTypes.STRING(50),
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      password: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      avatar: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      favouriteGame: {
         type: DataTypes.STRING(100),
         allowNull: true
      },

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

      isBanned: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
         allowNull: false
      },

      role: {
         type: DataTypes.ENUM(["user", "admin"]), // Only "user" and "admin" values will be accepted here
         allowNull: false,
         defaultValue: "user",
      },

   },
   {
      sequelize,
      modelName: "User",
      tableName: "user",
   }
);