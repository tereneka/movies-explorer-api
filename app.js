/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limitter = require('./middlewares/limiter');
const { router } = require('./routes/router');
const error = require('./middlewares/error');
const customErr = require('./middlewares/customError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { MONGO_URL, PORT, NODE_ENV } = require('./config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGO_URL);
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(cors);
app.use(limitter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(customErr);
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening in ${NODE_ENV || 'develop'} mode on port ${PORT}`);
});
