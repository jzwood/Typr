'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var config = require('./config');

var tales = require('./data/tales')
// mongodb connection

app.use(morgan('dev'))

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/api/tales', require('./routes/api/tales'));
app.use('/api/books', require('./routes/api/books'));
app.use('/api/typr',  require('./routes/api/typr'));

app.use('/', require('./routes/index'));


//leave here
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
