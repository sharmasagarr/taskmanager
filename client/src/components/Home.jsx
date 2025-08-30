import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiCirclePlus, CiCircleRemove } from "react-icons/ci";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({
    status: '',
    assignedToMe: false,
    dateFrom: '',
    dateTo: '',
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));  
    }   
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { status, assignedToMe, dateFrom, dateTo } = filter;

      const hasFilter = status || assignedToMe || dateFrom || dateTo;

      const url = hasFilter
        ? `https://taskmanager-beige-ten.vercel.app/api/tasks/filter`
        : `https://taskmanager-beige-ten.vercel.app/api/tasks`;

      const params = {};
      if (status) params.status = status;
      if (assignedToMe && user?.id) params.assignedTo = user.id;
      if (dateFrom) params.fromDate = dateFrom;
      if (dateTo) params.toDate = dateTo;

      const { data } = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const updateStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`https://taskmanager-beige-ten.vercel.app/api/tasks/${taskId}/status`, {
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Task status updated successfully!', { id: 'update-status-success' });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task status:', err.response?.data || err.message);
      toast.error('Failed to update status', { id: 'update-status-error' });
    }
  };
  const handleDelete = async (taskId) => {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
        await axios.delete(`https://taskmanager-beige-ten.vercel.app/api/tasks/${taskId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        fetchTasks();
    } catch (err) {
        console.error('Error deleting task:', err.response?.data || err.message);
        alert('Failed to delete task');
    }
    };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <h1 className="text-3xl font-bold text-blue-700">Task DashBoard</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/tasks/new')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
            >
              <CiCirclePlus size={25} /> New Task
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
              >
                <IoIosLogOut size={25} /> Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
              >
                <IoIosLogIn size={25} /> Login
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor='status' className="block text-sm mb-1 font-medium">Status</label>
            <select
              id='status'
              value={filter.status}
              onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="Todo">Todo</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label htmlFor='dateFrom' className="block text-sm mb-1 font-medium">From</label>
            <input
              type="date"
              id='dateFrom '
              value={filter.dateFrom}
              onChange={(e) => setFilter((prev) => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor='dateTo' className="block text-sm mb-1 font-medium">To</label>
            <input
              type="date"
              id='dateTo'
              value={filter.dateTo}
              onChange={(e) => setFilter((prev) => ({ ...prev, dateTo: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <input
              type="checkbox"
              id='assignedToMe'
              checked={filter.assignedToMe}
              disabled={!user}
              onChange={(e) => setFilter((prev) => ({ ...prev, assignedToMe: e.target.checked }))}
              className="w-4 h-4 disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
            <label htmlFor='assignedToMe' className="text-sm font-medium">Assigned to Me</label>
          </div>

          <button
            onClick={() =>
                setFilter({
                    status: '',
                    assignedToMe: false,
                    dateFrom: '',
                    dateTo: '',
                })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex justify-center items-center gap-2 cursor-pointer"
          >
            <CiCircleRemove size={25} /> Remove Filters
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-blue-700">{task.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                    {/* Status Update Dropdown */}
                    {task.assignedTo?._id === user?.id && (
                      <div className="mt-3">
                        <label htmlFor='updateStatus' className="block text-sm whitespace-nowrap font-medium">Update Status</label>
                        <select
                          id='updateStatus'
                          value={task.status}
                          onChange={(e) => updateStatus(task._id, e.target.value)}
                          className="w-full text-sm p-1 border border-gray-300 rounded-md"
                        >
                          <option value="Todo">Todo</option>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <div className="text-sm text-gray-600 flex justify-between items-center">
                  <div className='flex items-center gap-4'>
                    <p className={`font-medium rounded text-white p-1 ${task.status === 'Todo' && 'bg-amber-700'} ${task.status === 'In Progress' && 'bg-blue-700'} ${task.status === 'Done' && 'bg-green-700'} ${task.status === 'Pending' && 'bg-yellow-700'}`}>
                        {task.status}
                    </p>
                    <p><strong>Assigned To:</strong> {task.assignedTo?.name || 'Unassigned'}{task.assignedTo?._id === user?.id && <span className="text-green-500">(You)</span>}</p>
                  </div>
                    {/* Delete Button (only if user is assignee) */}
                    {task.assignee?._id === user?.id && (
                        <button
                        onClick={() => handleDelete(task._id)}
                        className="ml-2 text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1 cursor-pointer"
                        >
                        <MdDelete size={25} /> Delete
                        </button>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
