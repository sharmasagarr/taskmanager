import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    assignee: '',
    status: 'Todo',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || !user) {
        setError('You must be logged in to create a task');
        setLoading(false);
        return;
    }
    formData.assignee = user.id;
    const url = `${import.meta.env.VITE_API_URL}/tasks`;

    try {
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Task created successfully!', { id: 'task-create-success' });
      navigate('/'); 

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      toast.error('Task creation failed', { id: 'task-create-error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">📝 Create a New Task</h2>

        

        <div>
          <label htmlFor='title' className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            id='title'
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
            required
          />
        </div>

        <div>
          <label htmlFor='description' className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            id='description'
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task description"
            required
          />
        </div>

        <div>
          <label htmlFor='assignedTo' className="block text-sm font-medium mb-1">Assigned To (User Email)</label>
          <input
            type="email"
            name="assignedTo"
            id='assignedTo'
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="User Email to assign"
            required
          />
        </div>

        <div>
          <label htmlFor='status' className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            id='status'
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todo">Todo</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
