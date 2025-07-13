
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
    <div 
      className={`glass-card p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 task-card ${
        completed 
          ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200/50 dark:border-green-800/50' 
          : 'hover:bg-accent/20'
      }`}
      data-task-id={_id}
    >
      <div className="flex items-start space-x-4">
        {/* Enhanced Completion Toggle */}
        <button
          onClick={() => onToggleComplete(_id, !completed)}
          className={`flex-shrink-0 mt-1 p-1 rounded-full transition-all duration-300 hover:scale-110 ${
            completed 
              ? 'text-green-500 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800' 
              : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
          }`}
        >
          {completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        {/* Enhanced Task Content */}
        <div className="flex-1 min-w-0">
          {/* Task Title with better typography */}
          <h3 className={`text-lg font-semibold transition-all duration-300 ${
            completed 
              ? 'text-muted-foreground line-through' 
              : 'text-foreground'
          }`}>
            {title}
          </h3>

          {/* Task Description */}
          {description && (
            <p className={`mt-2 text-sm leading-relaxed ${
              completed ? 'text-muted-foreground/70' : 'text-muted-foreground'
            }`}>
              {description}
            </p>
          )}

          {/* Enhanced Task Meta Information */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {/* Category with improved styling */}
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getCategoryColor(category)}`}>
              <Tag className="w-3 h-3" />
              <span>{category}</span>
            </div>

            {/* Priority with gradient background */}
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getPriorityColor(priority)}`}>
              <AlertCircle className="w-3 h-3" />
              <span>{priority}</span>
            </div>

            {/* Due Date with enhanced styling */}
            {dueDate && (
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                isOverdue 
                  ? 'text-red-600 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800' 
                  : isDueSoon 
                    ? 'text-orange-600 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
                    : 'text-muted-foreground bg-muted/50 border-border'
              }`}>
                <Calendar className="w-3 h-3" />
                <span>
                  {isOverdue ? 'Overdue' : 'Due'} {formatDate(dueDate)}
                </span>
              </div>
            )}

            {/* Created Date */}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground/70">
              <Clock className="w-3 h-3" />
              <span>Created {formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-all duration-200 hover:scale-110"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all duration-200 hover:scale-110"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Enhanced Overdue Warning */}
      {isOverdue && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl backdrop-blur-sm">
          <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
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
