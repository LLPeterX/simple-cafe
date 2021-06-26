require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');

app.use(cors());
app.use(express.json());

app.use("/api", router);

// должно быть в самом конце
app.use(errorHandler);
// -------------- listener -------------

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




