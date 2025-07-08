import React from 'react';
import { Copy, Download, Share2, Code, FileText, BarChart3, MessageSquare, Palette, Sparkles } from 'lucide-react';
import { TaskType } from './TaskSelector';

interface Result {
  id: string;
  type: TaskType;
  prompt: string;
  content: string;
  timestamp: number;
}

interface ResultsAreaProps {
  results: Result[];
  onCopy: (content: string) => void;
  onDownload: (result: Result) => void;
  onShare: (result: Result) => void;
}

const taskIcons = {
  design: Palette,
  code: Code,
  summary: FileText,
  chart: BarChart3,
  social: MessageSquare,
  text: Sparkles,
};

const taskColors = {
  design: 'bg-purple-500',
  code: 'bg-green-500',
  summary: 'bg-blue-500',
  chart: 'bg-orange-500',
  social: 'bg-pink-500',
  text: 'bg-indigo-500',
};

export default function ResultsArea({ results, onCopy, onDownload, onShare }: ResultsAreaProps) {
  if (results.length === 0) {
    return (
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-12 border border-slate-700 text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Create</h3>
        <p className="text-slate-400">
          Select a tool above and enter your prompt to get started with AI-powered content generation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result) => {
        const Icon = taskIcons[result.type];
        const colorClass = taskColors[result.type];
        
        return (
          <div
            key={result.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white capitalize">{result.type}</h4>
                  <p className="text-sm text-slate-400">
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onCopy(result.content)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDownload(result)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onShare(result)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium text-slate-300 mb-2">Prompt:</h5>
              <p className="text-sm text-slate-400 bg-slate-900/50 p-3 rounded-lg italic">
                "{result.prompt}"
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-slate-300 mb-2">Result:</h5>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                {result.type === 'code' ? (
                  <pre className="text-sm text-green-400 overflow-x-auto">
                    <code>{result.content}</code>
                  </pre>
                ) : (
                  <p className="text-sm text-slate-200 whitespace-pre-wrap">{result.content}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}