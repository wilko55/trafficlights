'use strict';

const express = require('express');
const app = express();
const path = require('path');
const viewRoot = path.join(__dirname, '/views');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.USER || 'admin',
  password: process.env.PASSWORD || 'password',
  database: process.env.DB || 'statuscheckerDB',
  port: process.env.DBPORT || 3306
});
const validation = require('./lib/validation.js');
connection.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('hogan-express'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.set('port', (process.env.PORT || 7000));

app.get('/status', function(req, res, next) {
  req.query.code || typeof req.query.code === Number ? res.sendStatus(req.query.code) : res.sendStatus(500);
});

app.get('/traffic', function(req, res, next) {
  validation.checkConfig(req.query.config);
  connection.query('SELECT service, url, frequencyInSeconds from services where ' + req.query.config + ' = 1', function (err, rows, fields) {
    if (err) throw err;
    res.render('traffic', {data: JSON.stringify(rows)});
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
