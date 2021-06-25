require('dotenv').config();
const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  process.env.DB_NAME, // 1) имя БД
  process.env.DB_USER, // 2) имя пользователя (postgres)
  process.env.DB_PASSWORD, // 3) пароль прользователя
  { // настройки соединения с БД
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
);

