const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
});

const Task = mongoose.model('task', TaskSchema);
module.exports = Task;
