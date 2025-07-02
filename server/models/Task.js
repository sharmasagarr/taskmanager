import mongoose from 'mongoose';

const userRefSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  }
}, { _id: false });

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title must be at most 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
      minlength: [2, 'Description must be at least 2 characters'],
    },

    assignedTo: {
      type: userRefSchema,
      required: [true, 'AssignedTo user info is required'],
    },

    assignee: {
      type: userRefSchema,
      required: [true, 'Assignee user info is required'],
    },

    status: {
      type: String,
      enum: ['Todo', 'Pending', 'In Progress', 'Done'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;
