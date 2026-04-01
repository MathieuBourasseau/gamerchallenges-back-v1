import "dotenv/config";
import { Sequelize } from "sequelize";

/**
 * Sequelize client initialization.
 * It uses the DB_URL from environment variables to connect to the database.
 */
export const sequelize = new Sequelize(
   process.env.DB_URL,
   {
      // Disable Sequelize SQL logs in the console to keep the output clean
      logging: false, 
      define: {
          // Mapping Sequelize default field names to match the database's snake_case convention
          createdAt: "created_at", 
          updatedAt: "updated_at",
          // Ensures that all automatically generated column names (like foreign keys) use snake_case
          underscored: true, 
      }
   }
);