import React from 'react';
import { Zap, Settings, Share2, Download, History } from 'lucide-react';

interface HeaderProps {
  onToggleHistory: () => void;
  onShare: () => void;
  onExport: () => void;
}

export default function Header({ onToggleHistory, onShare, onExport }: HeaderProps) {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">PromptPilot</h1>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-slate-400">Multi-Tool AI Workspace</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleHistory}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Toggle History"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              onClick={onShare}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onExport}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Export"
            >
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}