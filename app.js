const dotenv = require('dotenv').config();
const createError = require('http-errors');
const express = require('express');

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middelware
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());

// Initialize DB
require('./database/initDB.js')();

const TaskRoute = require('./routes/to_do_routes.js');
app.use('/task', TaskRoute);

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port : ' + PORT + '...');
});

