import React from 'react';

const TaskItem = ({ task }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-yellow-200 text-yellow-800';
      case 'todo':
        return 'bg-red-200 text-red-800';
      case 'completed':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <span className="text-sm text-gray-500">Tenggat: {task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskItem;
