const express = require('express');
const logger = require('morgan');
const movies = require('./routes/movies') ;
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

require('dotenv').config()
app.set('secretKey', 'nodeRestApi'); // jwt secret token
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', function (req, res) {
  res.json({"About": "Homework - RESTful API with MongoDB"});
});

// public route
app.use('/users', users);
// private route
app.use('/movies', validateUser, movies);

function validateUser(req, res, next) {
  jwt.verify(
    req.headers['jwt'],
    req.app.get('secretKey'),
    function (err, decoded) {
      if (err) {
        res.json({
          status:"Error",
          message: err.message,
          data:null
        });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
}

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  if (err.status === 404) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
  next(err)
});

app.listen(port, function () {
  console.log(`Node server listening on port ${port}`);
});
