const createError = require('http-errors');
const mongoose = require('mongoose');
const Task = require('../models/to_do_model.js');

module.exports = {

//get all tasks list
  getAllTasks: async (req, res, next) => {
    try {
      const results = await Task.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

//create a new task
  createNewTask: async (req, res, next) => {
    try {
      const task = new Task(req.body);
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },


//find product by ID
  findTaskById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      res.send(task);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  },

//update a task by id
  updateATask: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Task.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Task does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Task Id'));
      }

      next(error);
    }
  },


//delete a task
  deleteATask: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Task.findByIdAndDelete(id);

      if (!result) {
        throw createError(404, 'Product does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Product id'));
        return;
      }
      next(error);
    }
  }
};