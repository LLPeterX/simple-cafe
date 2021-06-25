require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const sequelize = require('./db');

app.use(cors());

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`PosrgreSQL ${process.env.DB_HOST}:${process.env.DB_PORT} connected`);
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    })
  } catch (e) {
    console.log(`Error conecting to DB ${process.env.DB_HOST}:${process.env.DB_PORT}: ${e}`);
  }
}

start();




