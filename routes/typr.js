var express = require('express');
var router = express.Router();
var tales = require('../data/tales');

router.get('/', renderAllTales);

function renderAllTales(req, res, next) {
  res.render('pages/typr', { results: tales } );
}

module.exports = router;
