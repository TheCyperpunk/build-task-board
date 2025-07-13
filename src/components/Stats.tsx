
import React from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';

interface StatsProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

const Stats: React.FC<StatsProps> = ({ totalTasks, completedTasks, pendingTasks }) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
      gradient: 'from-green-400 to-green-600',
    },
    {
      title: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      gradient: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 task-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bgColor} shadow-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Enhanced Completion Rate with glassmorphism */}
        <div className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 task-card">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4 font-medium">Completion Rate</p>
            <div className="relative w-20 h-20 mx-auto mb-3">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-border"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary transition-all duration-1000 ease-out"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${completionRate}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{
                    strokeDashoffset: completionRate > 0 ? 0 : 100,
                    transition: 'stroke-dasharray 1s ease-out 0.5s'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">{completionRate}%</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {completionRate === 100 ? '🎉 All done!' : 'Keep going! 💪'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
