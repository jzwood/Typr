var express = require('express');
var router = express.Router();
var tales = require('../../data/tales');

router.get('/', getAllTales);
router.get('/id/:id', getTaleById);

function getAllTales(req, res, next) {
  console.log(tales);
  res.json(tales);
}

function getTaleById(req, res, next) {
  console.log(req.params.id);
  // get the tale from array w/ req.id
  var tale = tales.filter(function(tale) {
    console.log(tale);
    return tale.id === Number(req.params.id);
  });
  res.json(tale);
}


module.exports = router;
