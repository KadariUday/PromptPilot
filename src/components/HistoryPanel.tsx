import React, { useState } from 'react';
import { Search, Filter, Trash2, X } from 'lucide-react';
import { TaskType } from './TaskSelector';

interface HistoryItem {
  id: string;
  type: TaskType;
  prompt: string;
  content: string;
  timestamp: number;
}

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
}

export default function HistoryPanel({ 
  isOpen, 
  onClose, 
  history, 
  onSelectItem, 
  onDeleteItem, 
  onClearHistory 
}: HistoryPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TaskType | 'all'>('all');

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
      <div className="w-96 bg-slate-900 border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">History</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as TaskType | 'all')}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Types</option>
                <option value="design">Design</option>
                <option value="code">Code</option>
                <option value="summary">Summary</option>
                <option value="chart">Chart</option>
                <option value="social">Social</option>
                <option value="text">Text</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400">No history items found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors group"
                  onClick={() => onSelectItem(item)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white capitalize">
                      {item.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-slate-400">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item.id);
                        }}
                        className="p-1 text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 line-clamp-2 mb-1">
                    {item.prompt}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={onClearHistory}
              className="w-full px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Clear All History
            </button>
          </div>
        )}
      </div>
      
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}