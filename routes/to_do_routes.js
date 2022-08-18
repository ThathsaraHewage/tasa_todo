const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/to_do_controller.js');

router.get('/', TaskController.getAllTasks);
router.post('/add', TaskController.createNewTask);
router.get('/find/:id', TaskController.findTaskById);
router.patch('/list/:id', TaskController.updateATask);
router.delete('/list/:id', TaskController.deleteATask);

module.exports = router;

