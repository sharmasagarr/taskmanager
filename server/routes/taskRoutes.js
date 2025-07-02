import express from 'express';
import {
  createTask,
  updateStatus,
  deleteTask,
  getAllTasks,
  getFilteredTasks,
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteTask);
router.get('/', getAllTasks);
router.get('/filter', getFilteredTasks); // for filters like date, status, assignedTo

export default router;
