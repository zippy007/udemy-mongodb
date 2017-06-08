const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise - global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

// Assume any inbound request is JSON and Parse it for each request !
app.use(bodyParser.json());
routes(app);

// Declare the Middleware
app.use((err, req, res, next) => {
  res
    .status(422)
    .send({ error: err.message });
});

module.exports  = app;
