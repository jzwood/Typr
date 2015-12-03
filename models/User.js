'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
  // taleStats: [{ title: String, wordsTyped: Number }]
  letterStats: [{ letter: String, seen: Number, missed: Number }]
});

module.exports = mongoose.model('User', userSchema);
