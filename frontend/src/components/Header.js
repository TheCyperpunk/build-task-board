
import React from 'react';
import { Plus, CheckSquare } from 'lucide-react';

const Header = ({ onAddTask, tasksCount }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Task Manager
              </h1>
              <p className="text-sm text-gray-600">
                Stay organized, stay focused
              </p>
            </div>
          </div>

          {/* Stats and Add Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-primary-600">
                {tasksCount}
              </p>
            </div>
            
            <button
              onClick={onAddTask}
              className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
