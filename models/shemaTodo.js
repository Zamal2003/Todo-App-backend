const mongoose= require('mongoose')

const schemaTodo = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', schemaTodo);