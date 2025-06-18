const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'events_db',
  username: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASSWORD), // Convert password to string explicitly
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize; 