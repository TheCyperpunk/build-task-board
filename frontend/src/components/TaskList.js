
import React from 'react';
import TaskCard from './TaskCard';
import { ListTodo } from 'lucide-react';

const TaskList = ({ tasks, loading, onToggleComplete, onEditTask, onDeleteTask }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600">Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
        <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-600 mb-6">
          Get started by creating your first task!
        </p>
        <div className="text-sm text-gray-500">
          <p>💡 <strong>Tip:</strong> Use categories to organize your tasks</p>
          <p>🎯 <strong>Tip:</strong> Set priorities to focus on what matters most</p>
        </div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Tasks
            </h2>
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingTasks.length}
            </span>
          </div>
          <div className="grid gap-4">
            {pendingTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Completed Tasks
            </h2>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {completedTasks.length}
            </span>
          </div>
          <div className="grid gap-4">
            {completedTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
