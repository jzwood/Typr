'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaleSchema = new Schema({
	title: String,
  author: String,
  text: String,
  wordCount: Number,
  book: String
});

module.exports = mongoose.model('Tale', TaleSchema);
