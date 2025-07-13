
// Mock API service for development - replace with actual API calls in production
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

// Mock data for development
let mockTasks: Task[] = [
  {
    _id: '1',
    title: 'Complete React Project',
    description: 'Finish the task management system with modern UI',
    completed: false,
    category: 'Study',
    priority: 'High',
    dueDate: '2024-01-15',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    _id: '2',
    title: 'Read TypeScript Documentation',
    description: 'Learn advanced TypeScript patterns',
    completed: true,
    category: 'Study',
    priority: 'Medium',
    createdAt: '2024-01-09T10:00:00Z'
  },
  {
    _id: '3',
    title: 'Plan Weekend Trip',
    description: 'Research destinations and book accommodations',
    completed: false,
    category: 'Personal',
    priority: 'Low',
    dueDate: '2024-01-20',
    createdAt: '2024-01-08T10:00:00Z'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getTasks = async (filters?: Filters): Promise<Task[]> => {
  await delay(500); // Simulate network delay
  
  if (!filters) return mockTasks;
  
  return mockTasks.filter(task => {
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.completed !== 'all') {
      const isCompleted = task.completed;
      if (filters.completed === 'completed' && !isCompleted) return false;
      if (filters.completed === 'pending' && isCompleted) return false;
    }
    return true;
  });
};

export const createTask = async (taskData: Omit<Task, '_id' | 'createdAt'>): Promise<Task> => {
  await delay(300);
  
  const newTask: Task = {
    ...taskData,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  mockTasks.unshift(newTask);
  return newTask;
};

export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<Task> => {
  await delay(300);
  
  const taskIndex = mockTasks.findIndex(task => task._id === taskId);
  if (taskIndex === -1) throw new Error('Task not found');
  
  mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates };
  return mockTasks[taskIndex];
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await delay(300);
  
  const taskIndex = mockTasks.findIndex(task => task._id === taskId);
  if (taskIndex === -1) throw new Error('Task not found');
  
  mockTasks.splice(taskIndex, 1);
};
