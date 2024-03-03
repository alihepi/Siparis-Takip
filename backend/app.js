const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('./app_api/models/db');
require('./app_api/models/customer.js');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./app_api/routes/index');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
