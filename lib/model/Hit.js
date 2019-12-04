const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  link: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link'
  },
  hits: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Hit', schema);