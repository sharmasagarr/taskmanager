import Task from '../models/Task.js';
import User from '../models/User.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, assignee, status } = req.body;

    if (!assignedTo || !assignee) {
      return res.status(400).json({ message: 'AssignedTo and Assignee are required' });
    }

    // Find assigned user by email
    const assignedUser = await User.findOne({ email: assignedTo });
    const assigneeUser = await User.findById(assignee);

    if (!assignedUser) {
      return res.status(404).json({ message: 'Assigned User not found' });
    }

    if (!assigneeUser) {
      return res.status(404).json({ message: 'Assignee User not found' });
    }

    const newTask = await Task.create({
      title,
      description,
      status,
      assignedTo: {
        _id: assignedUser._id,
        name: assignedUser.name,
        email: assignedUser.email,
      },
      assignee: {
        _id: assigneeUser._id,
        name: assigneeUser.name,
        email: assigneeUser.email,
      },
    });

    res.status(201).json({ message: 'Task created', task: newTask });
  } catch (err) {
    console.error('Task creation error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update task status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Status updated', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get filtered tasks
export const getFilteredTasks = async (req, res) => {
  try {
    const { assignedTo, status, fromDate, toDate } = req.query;

    let filter = {};

    if (assignedTo) filter['assignedTo._id'] = assignedTo;
    if (status) filter.status = status;
    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
