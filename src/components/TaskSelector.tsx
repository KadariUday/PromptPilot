import React from 'react';
import { Code, FileText, BarChart3, MessageSquare, Palette, Sparkles } from 'lucide-react';

export type TaskType = 'design' | 'code' | 'summary' | 'chart' | 'social' | 'text';

interface TaskSelectorProps {
  selectedTask: TaskType;
  onSelectTask: (task: TaskType) => void;
}

const tasks = [
  { id: 'design' as TaskType, label: 'Design', icon: Palette, color: 'bg-purple-500', description: 'Create designs and mockups' },
  { id: 'code' as TaskType, label: 'Code', icon: Code, color: 'bg-green-500', description: 'Generate code snippets' },
  { id: 'summary' as TaskType, label: 'Summary', icon: FileText, color: 'bg-blue-500', description: 'Summarize content' },
  { id: 'chart' as TaskType, label: 'Chart', icon: BarChart3, color: 'bg-orange-500', description: 'Create data visualizations' },
  { id: 'social' as TaskType, label: 'Social', icon: MessageSquare, color: 'bg-pink-500', description: 'Social media posts' },
  { id: 'text' as TaskType, label: 'Text', icon: Sparkles, color: 'bg-indigo-500', description: 'General text generation' },
];

export default function TaskSelector({ selectedTask, onSelectTask }: TaskSelectorProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Select AI Tool</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {tasks.map((task) => {
          const Icon = task.icon;
          const isSelected = selectedTask === task.id;
          
          return (
            <button
              key={task.id}
              onClick={() => onSelectTask(task.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 group ${
                isSelected
                  ? 'border-blue-400 bg-blue-500/20 transform scale-105'
                  : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${task.color} ${
                  isSelected ? 'shadow-lg' : 'group-hover:shadow-md'
                }`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">{task.label}</span>
                <span className="text-xs text-slate-400 text-center leading-tight">
                  {task.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}