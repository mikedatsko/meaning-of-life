const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const meaningRoutes = require('./routes/meaning');
const db = require('./db');
const session = require('express-session');

app.set('trust proxy', 1);
app.use(session({
  secret: 'it-could-be-public-after-some-time',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true,
    // maxAge: 60000
  }
}));

app.use(function (req, res, next) {
  const addedMeanings = req.session.addedMeanings;
 
  if (typeof addedMeanings === 'undefined') {
    req.session.addedMeanings = 10;
  }

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/meaning', meaningRoutes);
app.use(express.static(path.join(__dirname, '../dist')));
app.use(favicon(path.join(__dirname, '../dist/assets/images', 'favicon.png')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = app;
