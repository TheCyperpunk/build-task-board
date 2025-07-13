
import React from 'react';
import TaskCard from './TaskCard';
import { ListTodo } from 'lucide-react';

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

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, loading, onToggleComplete, onEditTask, onDeleteTask }) => {
  if (loading) {
    return (
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          <span className="text-muted-foreground font-medium">Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="glass-card p-12 rounded-2xl text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
            <ListTodo className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            No tasks found
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Get started by creating your first task! Click the + button to begin organizing your day.
          </p>
          <div className="space-y-3 text-sm text-muted-foreground bg-muted/30 p-4 rounded-xl">
            <p className="flex items-center justify-center space-x-2">
              <span>💡</span>
              <strong>Tip:</strong>
              <span>Use categories to organize your tasks</span>
            </p>
            <p className="flex items-center justify-center space-x-2">
              <span>🎯</span>
              <strong>Tip:</strong>
              <span>Set priorities to focus on what matters most</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-8">
      {/* Pending Tasks with enhanced header */}
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
            <h2 className="text-xl font-semibold text-foreground">
              Pending Tasks
            </h2>
            <span className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-xs font-medium px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800">
              {pendingTasks.length} tasks
            </span>
          </div>
          <div className="grid gap-4">
            {pendingTasks.map((task, index) => (
              <div 
                key={task._id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskCard
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks with enhanced header */}
      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
            <h2 className="text-xl font-semibold text-foreground">
              Completed Tasks
            </h2>
            <span className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
              {completedTasks.length} completed
            </span>
          </div>
          <div className="grid gap-4">
            {completedTasks.map((task, index) => (
              <div 
                key={task._id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskCard
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
