'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var config = require('./config');

var Tale = require('./models/Tale');

// mongodb connection
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + config.DEV_DB);


app.use(morgan('dev'))

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/books', renderAllTales);

app.get('/api/tales', getAllTales);
app.get('/api/tales/id/:id', getTaleById);
app.get('/api/tales/title/:title', getTaleByTitle);



app.get('/', function(req, res) {
  Tale
  .find()
  .exec((err, doc) => {
    console.log(doc)
    if (err) {
      res.status(500).json({status:'error', message: err});
    } else {
      res.render('pages/index', { results: doc } );
    }
});

  // res.render('pages/index');
});

// var pg = require('pg');

// app.get('/books', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM tale_database', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/books', {results: result.rows} ); }
//     });
//   });
// });

// app.get('/books/:table_id', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM tale_database WHERE story_id = ' + request.params.table_id, function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/typr', {results: result.rows} ); }
//     });
//   });
// });


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// TODO: move this to routes

function getAllTales(req, res, next) {
  Tale
  .find()
  .exec((err,doc) => {
    if (err) {
      res.status(500).json({status:'error', message: err});
    } else {
      doc ? res.json(doc) : res.status(404).json({status:'error', message: 'no documents! :(' });
    }
  });
}

function getTaleById(req, res, next) {
  Tale
  .findOne({ _id: req.params.id })
  .exec((err,doc) => {
    if (err) {
      res.status(500).json({status:'error', message: err});
    } else {
      doc ? res.json(doc) : res.status(404).json({status:'error', message: 'Document not found' });
    }
  });
}

function getTaleByTitle(req, res, next) {
  Tale
  .findOne({ title: req.params.title })
  .exec((err,doc) => {
    if (err) {
      res.status(500).json({status:'error', message: err});
    } else {
      res.json(doc);
    }
  });
}


function renderAllTales(req, res, next) {
  Tale
  .find()
  .exec((err, doc) => {
    console.log(doc)
    if (err) {
      res.status(500).json({status:'error', message: err});
    } else {
      res.render('pages/books', { results: doc } );
    }
  });
}
