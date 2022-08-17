const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/to_do_controller.js');

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createNewTask);
router.get('/:id', TaskController.findTaskById);
router.patch('/:id', TaskController.updateATask);
router.delete('/:id', TaskController.deleteATask);

module.exports = router;
