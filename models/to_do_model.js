const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

const Task = mongoose.model('task', TaskSchema);
module.exports = Task;