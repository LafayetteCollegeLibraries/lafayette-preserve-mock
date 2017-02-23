var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();
var debug = require('debug')('lafayette-preserve-mock')

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(function (req, res, next) {
  debug(`${req.method} ${req.url}`)
  next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.setHeader('Content-Type', 'application/json')

  res.send(JSON.stringify({
    error: err.message || 'Internal Server Error',
    status: err.status || 500,
  }))
})

module.exports = app
