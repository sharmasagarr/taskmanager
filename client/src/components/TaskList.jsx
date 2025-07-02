import React, { useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => [...prev, formData]);
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      status: 'Pending',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 border rounded-lg shadow-md bg-white"
      >
        <h2 className="text-2xl font-semibold mb-4">Assign New Task</h2>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Title:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Assigned To:</span>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-6">
          <span className="block mb-1 font-medium">Status:</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Assigned Tasks</h2>
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks assigned yet.</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p>
                <strong>Assigned To:</strong> {task.assignedTo}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded text-white text-sm ${
                    task.status === 'Pending'
                      ? 'bg-yellow-500'
                      : task.status === 'In Progress'
                      ? 'bg-blue-500'
                      : 'bg-green-600'
                  }`}
                >
                  {task.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
