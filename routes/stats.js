var express = require('express');
var router = express.Router();

// router.post('/data/', function(req, res) {
//       res.send('pages/stats');
// });

router.get('/', function(req, res) {
  res.render('pages/stats');
});

module.exports = router;
