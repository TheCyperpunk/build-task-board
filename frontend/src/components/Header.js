
import React from 'react';
import { Plus, CheckSquare } from 'lucide-react';

const Header = ({ onAddTask, tasksCount }) => {
  return (
    <header className="glass-card border-b sticky top-0 z-40 transition-all duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Title with enhanced styling */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-2xl shadow-lg">
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Task Manager
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Stay organized, stay focused ✨
              </p>
            </div>
          </div>

          {/* Enhanced Stats and Add Button */}
          <div className="flex items-center space-x-6">
            <div className="hidden sm:block text-right glass-card px-4 py-2 rounded-xl">
              <p className="text-xs text-muted-foreground font-medium">Total Tasks</p>
              <p className="text-2xl font-bold text-primary">
                {tasksCount}
              </p>
            </div>
            
            <button
              onClick={onAddTask}
              className="group flex items-center space-x-2 bg-gradient-primary hover:shadow-lg text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden sm:inline font-medium">Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
