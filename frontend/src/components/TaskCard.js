
import React from 'react';
import { 
  CheckCircle, 
  Circle, 
  Edit2, 
  Trash2, 
  Calendar,
  Clock,
  Tag,
  AlertCircle
} from 'lucide-react';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const {
    _id,
    title,
    description,
    completed,
    category,
    priority,
    dueDate,
    createdAt
  } = task;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Study': return 'text-blue-600 bg-blue-50';
      case 'Personal': return 'text-purple-600 bg-purple-50';
      case 'Project': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = dueDate && new Date(dueDate) < new Date() && !completed;
  const isDueSoon = dueDate && !completed && 
    new Date(dueDate) > new Date() && 
    new Date(dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000); // Due within 24 hours

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md ${
      completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
    }`}>
      <div className="flex items-start space-x-4">
        {/* Completion Toggle */}
        <button
          onClick={() => onToggleComplete(_id, !completed)}
          className={`flex-shrink-0 mt-1 transition-colors duration-200 ${
            completed 
              ? 'text-green-600 hover:text-green-700' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {/* Task Title */}
          <h3 className={`text-lg font-semibold transition-colors duration-200 ${
            completed 
              ? 'text-gray-500 line-through' 
              : 'text-gray-900'
          }`}>
            {title}
          </h3>

          {/* Task Description */}
          {description && (
            <p className={`mt-2 text-sm ${
              completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {description}
            </p>
          )}

          {/* Task Meta Information */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Category */}
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
              <Tag className="w-3 h-3" />
              <span>{category}</span>
            </div>

            {/* Priority */}
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(priority)}`}>
              <AlertCircle className="w-3 h-3" />
              <span>{priority}</span>
            </div>

            {/* Due Date */}
            {dueDate && (
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                isOverdue 
                  ? 'text-red-600 bg-red-50' 
                  : isDueSoon 
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-600 bg-gray-50'
              }`}>
                <Calendar className="w-3 h-3" />
                <span>
                  {isOverdue ? 'Overdue' : 'Due'} {formatDate(dueDate)}
                </span>
              </div>
            )}

            {/* Created Date */}
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Created {formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overdue Warning */}
      {isOverdue && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 text-red-800">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              This task is overdue! Consider updating the due date or marking it complete.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
