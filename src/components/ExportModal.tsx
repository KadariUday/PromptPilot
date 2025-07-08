import React, { useState } from 'react';
import { X, Download, Copy, FileText, File } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  onExport: (format: string, data: any[]) => void;
}

export default function ExportModal({ isOpen, onClose, data, onExport }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if (!isOpen) return null;

  const exportFormats = [
    { id: 'json', label: 'JSON', icon: FileText, description: 'Export as JSON file' },
    { id: 'csv', label: 'CSV', icon: File, description: 'Export as CSV spreadsheet' },
    { id: 'txt', label: 'Text', icon: FileText, description: 'Export as plain text' },
    { id: 'md', label: 'Markdown', icon: FileText, description: 'Export as Markdown file' },
  ];

  const handleExport = () => {
    const itemsToExport = selectedItems.length > 0 
      ? data.filter(item => selectedItems.includes(item.id))
      : data;
    
    onExport(selectedFormat, itemsToExport);
    onClose();
  };

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-lg mx-4 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Export Data</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3">Export Format</h3>
            <div className="grid grid-cols-2 gap-3">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedFormat === format.id
                        ? 'border-blue-400 bg-blue-500/20'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-white">{format.label}</span>
                    </div>
                    <p className="text-xs text-slate-400">{format.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3">
              Items to Export ({selectedItems.length > 0 ? selectedItems.length : data.length} of {data.length})
            </h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              <label className="flex items-center space-x-2 p-2 hover:bg-slate-800 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.length === 0}
                  onChange={() => setSelectedItems([])}
                  className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-400"
                />
                <span className="text-sm text-slate-300">Export all items</span>
              </label>
              
              {data.map((item) => (
                <label key={item.id} className="flex items-center space-x-2 p-2 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-400"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 truncate">{item.prompt}</p>
                    <p className="text-xs text-slate-400 capitalize">{item.type}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}