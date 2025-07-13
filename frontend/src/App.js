
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import Stats from './components/Stats';
import * as taskAPI from './services/taskAPI';
import toast from 'react-hot-toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    completed: 'all'
  });

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [filters]);

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

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowForm(false);
      toast.success('Task created successfully! 🎉');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskAPI.updateTask(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task._id === taskId ? updatedTask : task
      ));
      setEditingTask(null);
      toast.success('Task updated successfully! ✨');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully! 🗑️');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskAPI.updateTask(taskId, { completed });
      setTasks(prev => prev.map(task => 
        task._id === taskId ? updatedTask : task
      ));
      toast.success(completed ? 'Task completed! 🎉' : 'Task marked as incomplete');
    } catch (error) {
      console.error('Error toggling task:', error);
      toast.error('Failed to update task status. Please try again.');
    }
  };

  const handleEditTask = (task) => {
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
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Header 
        onAddTask={() => setShowForm(true)}
        tasksCount={totalTasks}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Section */}
        <Stats 
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={totalTasks - completedTasks}
        />

        {/* Filter Bar */}
        <FilterBar 
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Task Form Modal */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? 
              (data) => handleUpdateTask(editingTask._id, data) : 
              handleCreateTask
            }
            onClose={handleCloseForm}
          />
        )}

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
