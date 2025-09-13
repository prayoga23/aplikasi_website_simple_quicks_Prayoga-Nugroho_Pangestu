import React, { useState, useEffect } from 'react';
import { 
  Schedule as ScheduleIcon, 
  Create as CreateIcon, 
  Close as CloseIcon,
  KeyboardArrowDown as ArrowDownIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

const dummyTasks = [
  { id: 1, title: 'Close off Case #012920- RODRIGUES, Amiguel', status: 'todo', dueDate: new Date('2021-06-12'), daysLeft: 2, description: 'Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!' },
  { id: 2, title: 'Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203', status: 'todo', dueDate: new Date('2021-06-14'), daysLeft: 4, description: 'All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.' },
  { id: 3, title: 'Set up appointment with Dr Blake', status: 'todo', dueDate: new Date('2021-06-22'), daysLeft: 10, description: 'No Description' },
  { id: 4, title: 'Contact Mr Caleb - video conference?', status: 'completed', dueDate: new Date('2021-06-03'), daysLeft: 0, description: '' },
  { id: 5, title: 'Assign 3 homework to Client A', status: 'completed', dueDate: new Date('2021-06-02'), daysLeft: 0, description: '' },
];

const TaskBox = ({ onClose }) => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState('My Tasks');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [menuOpenTaskId, setMenuOpenTaskId] = useState(null);
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: null,
    description: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd');
  };

  const handleDateChange = (date, taskId = null) => {
    if (taskId) {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, dueDate: new Date(date) } : task
      );
      setTasks(updatedTasks);
    } else {
      handleNewTaskChange('dueDate', new Date(date));
    }
  };

  const handleDescriptionEdit = (taskId, newDescription) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, description: newDescription } : task
    ));
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setMenuOpenTaskId(null);
  };

  const toggleMenu = (taskId) => {
    setMenuOpenTaskId(menuOpenTaskId === taskId ? null : taskId);
  };

  const handleCheckboxClick = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed' } 
        : task
    ));
  };

  const handleNewTaskChange = (field, value) => {
    setNewTask(prevTask => ({
      ...prevTask,
      [field]: value
    }));
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      const newTaskToAdd = {
        ...newTask,
        id: tasks.length + 1,
        status: 'todo',
        daysLeft: Math.ceil((newTask.dueDate - new Date()) / (1000 * 60 * 60 * 24))
      };
      setTasks([...tasks, newTaskToAdd]);
      setNewTask({ title: '', dueDate: null, description: '' });
      setIsAddingNewTask(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-5 w-7/12 h-5/6 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="relative">
          <select 
            className="appearance-none p-2 pr-8 border rounded text-black font-bold"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
          >
            <option>My Tasks</option>
            <option>Personal Errands</option>
            <option>Urgent To-Do</option>
          </select>
          <ArrowDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        <div className="flex items-center">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setIsAddingNewTask(true)}
          >
            New Task
          </button>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100%-64px)] p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {isAddingNewTask && (
              <div className="mb-4 border-b pb-4 last:border-b-0">
                <div className="flex items-start">
                  <CreateIcon fontSize="small" className="mr-2 mt-2 text-gray-500" />
                  <input 
                    type="text"
                    placeholder="Type Task Title"
                    className="flex-grow p-2 border rounded text-black"
                    value={newTask.title}
                    onChange={(e) => handleNewTaskChange('title', e.target.value)}
                  />
                </div>
                <div className="mt-2 flex items-center">
                  <ScheduleIcon fontSize="small" className="mr-2 text-gray-500" />
                  <input
                    type="date"
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    value={newTask.dueDate ? formatDate(newTask.dueDate) : ''}
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                </div>
                <div className="mt-2 flex items-start">
                  <CreateIcon fontSize="small" className="mr-2 mt-1 text-gray-500" />
                  <textarea
                    placeholder="No Description"
                    className="flex-grow p-2 border rounded text-black"
                    value={newTask.description}
                    onChange={(e) => handleNewTaskChange('description', e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    onClick={handleAddTask}
                  >
                    <CreateIcon fontSize="small" className="mr-2" />
                    Add Task
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center ml-2"
                    onClick={() => setIsAddingNewTask(false)} // Cancel button functionality
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {tasks.map((task) => (
              <div key={task.id} className="mb-4 border-b pb-4 last:border-b-0">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3 cursor-pointer" 
                    checked={task.status === 'completed'} 
                    onChange={() => handleCheckboxClick(task.id)}
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-medium text-black transition-all duration-300 ${
                          task.status === 'completed' 
                            ? 'line-through opacity-50' 
                            : 'no-underline opacity-100'
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center mt-2">
                          <ScheduleIcon fontSize="small" className="mr-2 text-gray-500" />
                          <input
                            type="date"
                            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            value={formatDate(task.dueDate)}
                            onChange={(e) => handleDateChange(e.target.value, task.id)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        {task.status !== 'completed' && (
                          <span className={`text-sm ${task.daysLeft <= 2 ? 'text-red-500' : 'text-gray-500'} mr-2`}>
                            {task.daysLeft} Days Left
                          </span>
                        )}
                        <div className="relative">
                          <button 
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => toggleMenu(task.id)}
                          >
                            <MoreIcon fontSize="small" />
                          </button>
                          {menuOpenTaskId === task.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                              <div className="py-1">
                                <button
                                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
                                  onClick={() => handleDeleteTask(task.id)}
                                >
                                  <DeleteIcon fontSize="small" className="mr-2" />
                                  Delete Task
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <div className="border rounded p-1 mr-2 cursor-pointer">
                          <CreateIcon 
                            fontSize="small" 
                            className="text-gray-500"
                            onClick={() => setEditingTaskId(task.id)}
                          />
                        </div>
                        {editingTaskId === task.id ? (
                          <input
                            type="text"
                            value={task.description}
                            onChange={(e) => handleDescriptionEdit(task.id, e.target.value)}
                            onBlur={() => setEditingTaskId(null)}
                            autoFocus
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          <span>{task.description}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskBox;