
import React from 'react';
import { CheckCircle, Circle, Edit3, Trash2, Calendar, Tag, Flag } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  priority: string;
  dueDate?: string;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Study': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Personal': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Project': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'Other': return 'text-teal-600 bg-teal-50 border-teal-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div 
      className={`glass-card p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] task-card ${
        task.completed ? 'opacity-75' : ''
      } ${isOverdue ? 'border-red-200 bg-red-50/50' : 'border-border'}`}
      data-task-id={task._id}
    >
      <div className="flex items-start space-x-4">
        {/* Complete Toggle */}
        <button
          onClick={() => onToggleComplete(task._id, !task.completed)}
          className="mt-1 p-1 hover:bg-muted rounded-full transition-colors group"
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6 text-success transition-transform group-hover:scale-110" />
          ) : (
            <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`text-lg font-semibold text-foreground leading-tight ${
              task.completed ? 'line-through text-muted-foreground' : ''
            }`}>
              {task.title}
            </h3>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                aria-label="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`text-sm text-muted-foreground mb-4 leading-relaxed ${
              task.completed ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}

          {/* Tags and Due Date */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {/* Category Tag */}
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(task.category)}`}>
              <Tag className="w-3 h-3 mr-1" />
              {task.category}
            </span>

            {/* Priority Tag */}
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </span>

            {/* Due Date */}
            {task.dueDate && (
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${
                isOverdue 
                  ? 'text-red-700 bg-red-100 border-red-300' 
                  : 'text-blue-600 bg-blue-50 border-blue-200'
              }`}>
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(task.dueDate)}
                {isOverdue && ' (Overdue)'}
              </span>
            )}
          </div>

          {/* Created Date */}
          <div className="text-xs text-muted-foreground">
            Created {formatDate(task.createdAt)}
          </div>
        </div>
      </div>

      {/* Progress indicator for overdue tasks */}
      {isOverdue && (
        <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-200">
          <p className="text-xs text-red-700 font-medium">
            ⚠️ This task is overdue and needs attention
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
