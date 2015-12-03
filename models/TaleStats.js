'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = Schema({
  username: String,
  letterStats: [{ letter: String, seen: Number, missed: Number }],
  taleStats: [{ type: Schema.Types.ObjectId, ref: 'TaleStat' }]
});

var talestatSchema = Schema({
  _user : { type: Number, ref: 'User'},
  wordsTyped : Number
});

var TaleStat  = mongoose.model('TaleStat', taleStatSchema);
var User = mongoose.model('User', userSchema);


/*******************************/
var jake = new User({ _id: 0, username: 'Jake'});

jake.save(function (err) {
  if (err) return handleError(err);

  var story1 = new Talestat({
    wordstyped: 25,
    _creator: req.currentUser.id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});
