require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const sequelize = require('./db');
const models = require('./models/models');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
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




