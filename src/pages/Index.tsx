
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import Stats from '../components/Stats';
import DarkModeToggle from '../components/DarkModeToggle';
import { useDarkMode } from '../hooks/useDarkMode';
import * as taskAPI from '../services/taskAPI';
import toast from 'react-hot-toast';

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

interface Filters {
  category: string;
  priority: string;
  completed: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priority: 'all',
    completed: 'all'
  });
  
  const { isDark, toggle: toggleDarkMode } = useDarkMode();

  // Fetch tasks on component mount and filter changes
  useEffect(() => {
    fetchTasks();
  }, [filters]);

  // Page load animation
  useEffect(() => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.6s ease-out';
      document.body.style.opacity = '1';
    }, 100);
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskAPI.getTasks(filters);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Omit<Task, '_id' | 'createdAt'>) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowForm(false);
      toast.success('Task created successfully! 🎉', {
        duration: 3000,
        style: {
          background: 'hsl(var(--success))',
          color: 'hsl(var(--success-foreground))',
        },
      });
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      const updatedTask = await taskAPI.updateTask(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task._id === taskId ? updatedTask : task
      ));
      setEditingTask(null);
      toast.success('Task updated successfully! ✨', {
        style: {
          background: 'hsl(var(--info))',
          color: 'hsl(var(--info-foreground))',
        },
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully! 🗑️', {
        style: {
          background: 'hsl(var(--warning))',
          color: 'hsl(var(--warning-foreground))',
        },
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      const updatedTask = await taskAPI.updateTask(taskId, { completed });
      setTasks(prev => prev.map(task => 
        task._id === taskId ? updatedTask : task
      ));
      
      const successElement = document.querySelector(`[data-task-id="${taskId}"]`);
      if (successElement) {
        successElement.classList.add('success-pulse');
        setTimeout(() => successElement.classList.remove('success-pulse'), 600);
      }
      
      toast.success(completed ? 'Task completed! 🎉' : 'Task marked as incomplete', {
        style: {
          background: completed ? 'hsl(var(--success))' : 'hsl(var(--warning))',
          color: completed ? 'hsl(var(--success-foreground))' : 'hsl(var(--warning-foreground))',
        },
      });
    } catch (error) {
      console.error('Error toggling task:', error);
      toast.error('Failed to update task status. Please try again.');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-warm transition-colors duration-300">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '1rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      
      {/* Header with dark mode toggle */}
      <div className="relative">
        <Header 
          onAddTask={() => setShowForm(true)}
          tasksCount={totalTasks}
        />
        <div className="absolute top-4 right-4">
          <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Animated Stats Section */}
        <div className="animate-fadeInUp">
          <Stats 
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={totalTasks - completedTasks}
          />
        </div>

        {/* Filter Bar */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <FilterBar 
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Task Form Modal with slide animation */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeInUp">
            <div className="animate-slideInRight">
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? 
                  (data) => handleUpdateTask(editingTask._id, data) : 
                  handleCreateTask
                }
                onClose={handleCloseForm}
              />
            </div>
          </div>
        )}

        {/* Task List with staggered animation */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fab group"
        aria-label="Add new task"
      >
        <Plus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
      </button>
    </div>
  );
};

export default Index;
