import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TaskSelector, { TaskType } from './components/TaskSelector';
import PromptInput from './components/PromptInput';
import ResultsArea from './components/ResultsArea';
import HistoryPanel from './components/HistoryPanel';
import ExportModal from './components/ExportModal';

interface Result {
  id: string;
  type: TaskType;
  prompt: string;
  content: string;
  timestamp: number;
}

// Mock AI responses for demonstration
const generateMockResponse = (type: TaskType, prompt: string): string => {
  const responses = {
    design: `# Design Concept

Based on your prompt: "${prompt}"

## Layout Structure
- Hero section with compelling headline
- Feature highlights with icons
- Call-to-action buttons
- Responsive grid layout

## Color Scheme
- Primary: #3B82F6 (Blue)
- Secondary: #10B981 (Green)
- Accent: #F59E0B (Amber)

## Typography
- Headers: Inter Bold
- Body: Inter Regular
- Accent: Inter Medium

## Components
- Navigation bar with logo
- Card-based content sections
- Interactive buttons with hover states
- Mobile-responsive design

This design focuses on modern aesthetics with clean lines and intuitive user experience.`,

    code: `// React Component Generated from: "${prompt}"

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">User Profile</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-gray-500 mr-3" />
          <span className="text-gray-700">{user.email}</span>
        </div>
        
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-gray-500 mr-3" />
          <span className="text-gray-700">{user.phone}</span>
        </div>
        
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-gray-500 mr-3" />
          <span className="text-gray-700">{user.location}</span>
        </div>
      </div>
      
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isEditing ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>
  );
}`,

    summary: `# Content Summary

**Original Prompt:** "${prompt}"

## Key Points
• Artificial Intelligence is transforming industries at an unprecedented pace
• Machine learning algorithms are becoming more sophisticated and accessible
• AI applications span from healthcare to autonomous vehicles
• Ethical considerations are crucial for responsible AI development

## Main Insights
The content discusses the rapid evolution of AI technologies and their impact on society. Key themes include technological advancement, practical applications, and the importance of ethical frameworks.

## Recommendations
1. Stay informed about AI developments
2. Consider ethical implications in AI implementation
3. Explore practical applications in your field
4. Invest in AI education and training

## Conclusion
The future of AI looks promising but requires careful consideration of both opportunities and challenges. Balanced approach is essential for sustainable progress.`,

    chart: `# Data Visualization: Quarterly Sales Performance

**Based on prompt:** "${prompt}"

## Chart Configuration
- Type: Bar Chart
- Data Points: Q1-Q4 Sales Data
- Colors: Blue gradient theme

## Sample Data
Q1 2024: $125,000
Q2 2024: $150,000
Q3 2024: $175,000
Q4 2024: $200,000

## Key Insights
• 60% growth from Q1 to Q4
• Consistent upward trend
• Strong Q4 performance
• Average quarterly growth: 15%

## Recommendations
- Continue current growth strategies
- Investigate Q4 success factors
- Plan for sustained momentum
- Monitor market conditions

*Chart visualization would be rendered here in a real implementation*`,

    social: `📱 **LinkedIn Post**

*Prompt inspiration: "${prompt}"*

🚀 **Productivity Tips That Actually Work**

After years of testing different approaches, here are my top 5 productivity hacks:

1️⃣ **Time Blocking** - Schedule specific tasks in calendar blocks
2️⃣ **2-Minute Rule** - If it takes less than 2 minutes, do it now
3️⃣ **Single-Tasking** - Focus on one thing at a time
4️⃣ **Energy Management** - Match tasks to your energy levels
5️⃣ **Regular Breaks** - Use the Pomodoro Technique

💡 The key isn't doing more things—it's doing the right things efficiently.

What's your #1 productivity tip? Share below! 👇

#Productivity #TimeManagement #WorkSmart #LinkedIn #CareerTips

---

**Engagement Strategy:**
- Post during peak hours (8-10 AM)
- Use relevant hashtags
- Ask questions to encourage comments
- Share personal experience for authenticity`,

    text: `Professional Email Response

**Subject:** Project Update - Weekly Status Report

**Generated from:** "${prompt}"

Dear Team,

I hope this email finds you well. I wanted to provide you with a comprehensive update on our current project status and upcoming milestones.

## Current Progress
We have successfully completed 75% of the planned deliverables for this quarter. The development team has been working diligently on the core features, and we're pleased to report that we're ahead of schedule in several key areas.

## Key Accomplishments
• Completed user authentication system
• Implemented dashboard analytics
• Finished mobile responsive design
• Conducted thorough security testing

## Upcoming Priorities
1. User acceptance testing phase
2. Performance optimization
3. Final bug fixes and improvements
4. Documentation completion

## Timeline
We remain on track to deliver the final product by the end of this month. The next milestone review is scheduled for Friday, where we'll discuss the remaining tasks and resource allocation.

## Action Items
Please review the attached project documentation and provide feedback by Wednesday. If you have any concerns or questions, don't hesitate to reach out.

Thank you for your continued dedication and hard work.

Best regards,
[Your Name]
Project Manager

---

**Email Metadata:**
- Tone: Professional, informative
- Length: Concise but comprehensive
- Call to action: Clear next steps
- Attachments: Project documentation`
  };

  return responses[type] || `Generated content for ${type} task based on: "${prompt}"`;
};

function App() {
  const [selectedTask, setSelectedTask] = useState<TaskType>('text');
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleSubmit = useCallback(async (prompt: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newResult: Result = {
      id: Date.now().toString(),
      type: selectedTask,
      prompt,
      content: generateMockResponse(selectedTask, prompt),
      timestamp: Date.now(),
    };
    
    setResults(prev => [newResult, ...prev]);
    setIsLoading(false);
  }, [selectedTask]);

  const handleCopy = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    // You would show a toast notification here
  }, []);

  const handleDownload = useCallback((result: Result) => {
    const blob = new Blob([result.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.type}-${result.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleShare = useCallback((result: Result) => {
    if (navigator.share) {
      navigator.share({
        title: `${result.type} Result`,
        text: result.content,
      });
    } else {
      // Fallback to copying share URL
      const shareUrl = `${window.location.origin}/shared/${result.id}`;
      navigator.clipboard.writeText(shareUrl);
    }
  }, []);

  const handleSelectHistoryItem = useCallback((item: Result) => {
    setSelectedTask(item.type);
    setIsHistoryOpen(false);
  }, []);

  const handleDeleteHistoryItem = useCallback((id: string) => {
    setResults(prev => prev.filter(result => result.id !== id));
  }, []);

  const handleClearHistory = useCallback(() => {
    setResults([]);
    setIsHistoryOpen(false);
  }, []);

  const handleExport = useCallback((format: string, data: Result[]) => {
    let content = '';
    let mimeType = 'text/plain';
    let filename = `promptpilot-export.${format}`;

    switch (format) {
      case 'json':
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        break;
      case 'csv':
        content = 'Type,Prompt,Content,Timestamp\n' + 
          data.map(item => `"${item.type}","${item.prompt}","${item.content}","${new Date(item.timestamp).toISOString()}"`).join('\n');
        mimeType = 'text/csv';
        break;
      case 'md':
        content = data.map(item => `# ${item.type}\n\n**Prompt:** ${item.prompt}\n\n**Result:**\n${item.content}\n\n---\n`).join('\n');
        mimeType = 'text/markdown';
        break;
      default:
        content = data.map(item => `${item.type.toUpperCase()}\nPrompt: ${item.prompt}\nResult: ${item.content}\n\n---\n`).join('\n');
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
        onShare={() => handleShare(results[0])}
        onExport={() => setIsExportOpen(true)}
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              AI-Powered Content Creation
            </h2>
            <p className="text-xl text-slate-400">
              Transform your ideas into reality with intelligent task automation
            </p>
          </div>

          <TaskSelector
            selectedTask={selectedTask}
            onSelectTask={setSelectedTask}
          />

          <PromptInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            selectedTask={selectedTask}
          />

          <ResultsArea
            results={results}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onShare={handleShare}
          />
        </div>
      </main>

      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={results}
        onSelectItem={handleSelectHistoryItem}
        onDeleteItem={handleDeleteHistoryItem}
        onClearHistory={handleClearHistory}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={results}
        onExport={handleExport}
      />
    </div>
  );
}

export default App;