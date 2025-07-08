import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { TaskType } from './TaskSelector';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  selectedTask: TaskType;
}

export default function PromptInput({ onSubmit, isLoading, selectedTask }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const placeholderText = {
    design: 'Design a modern landing page for a tech startup...',
    code: 'Create a React component for a user profile card...',
    summary: 'Summarize this article about artificial intelligence...',
    chart: 'Create a bar chart showing quarterly sales data...',
    social: 'Write a LinkedIn post about productivity tips...',
    text: 'Write a professional email about project updates...'
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholderText[selectedTask]}
            className="w-full h-32 px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none"
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-xl">
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            {prompt.length}/1000 characters
          </div>
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>{isLoading ? 'Generating...' : 'Generate'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}