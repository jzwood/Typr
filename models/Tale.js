'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taleSchema = new Schema({
	_id : Number,
	title: String,
  author: String,
  text: String,
  wordCount: Number,
  book: String
});

module.exports = mongoose.model('Tale', taleSchema);
