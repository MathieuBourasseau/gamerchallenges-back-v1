import { sequelize } from "../Models/index.js";

/**
 * DATABASE SYNCHRONIZATION SCRIPT
 * This script connects to the database and creates all tables defined in the Models.
 */

console.log("Creating tables...");

/**
 * sequelize.sync() matches the models to the database tables.
 * { force: true } will DROP all existing tables and recreate them from scratch.
 * WARNING: This is only used in development to reset the database structure.
 */
await sequelize.sync({ force: true });

console.log("Tables created successfully.");

/**
 * Closing the connection to the database to free up resources 
 * once the operation is complete.
 */
await sequelize.close();

console.log("Database connection closed.");