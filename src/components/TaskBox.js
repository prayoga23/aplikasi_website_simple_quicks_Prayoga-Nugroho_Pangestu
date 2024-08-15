import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

const dummyTasks = [
  { id: 1, title: 'Meninjau dokumen naturalisasi', status: 'ongoing', dueDate: '2023-06-15' },
  { id: 2, title: 'Menyiapkan berkas untuk sidang', status: 'todo', dueDate: '2023-06-20' },
  { id: 3, title: 'Menghubungi klien untuk update kasus', status: 'completed', dueDate: '2023-06-10' },
];

const TaskBox = ({ onClose }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi pemanggilan API
    setTimeout(() => {
      setTasks(dummyTasks);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="fixed bottom-20 right-5 w-7/12 h-5/6">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full h-full flex flex-col">
        <div className="p-4 border-b bg-green-500 text-white rounded-t-lg flex justify-between items-center">
          <p className="text-xl font-semibold">Daftar Tugas</p>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-400 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-grow p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              <span className="ml-3 text-green-500">Memuat tugas...</span>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBox;
