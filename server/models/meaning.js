var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  dislikes: {
    type: Number,
    required: true
  },
  contr: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Meaning', schema);
