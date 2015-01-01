'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InstagramSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Instagram', InstagramSchema);