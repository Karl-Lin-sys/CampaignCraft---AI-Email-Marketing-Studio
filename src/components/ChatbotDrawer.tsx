import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Feather,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, ChatRole, TaskType, CampaignData } from '../types/campaign';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignData;
  onApplySnippet?: (text: string) => void;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  campaign,
  onApplySnippet,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I am your AI Email Marketing Strategist & Copy Doctor.

I have full context on your campaign **"${campaign.campaignTitle || 'Untitled Campaign'}"**.

How can I help you elevate this campaign today?
• Plan a multi-email drip sequence
• Audit your copy for spam triggers & deliverability
• Rewrite headlines or opening hooks with stronger urgency
• Propose statistical A/B test variations`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<ChatRole>('copywriter');
  
  // Model selection rules:
  // "Use gemini-3.1-pro-preview for particularly complex tasks, gemini-3.5-flash for general tasks, and gemini-3.1-flash-lite for tasks that should happen fast."
  const [taskType, setTaskType] = useState<TaskType>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string, overrideTaskType?: TaskType) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const currentTaskType = overrideTaskType || taskType;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          role,
          taskType: currentTaskType,
          campaignContext: {
            title: campaign.campaignTitle,
            theme: campaign.theme,
            subjectLines: campaign.subjectLines,
            headline: campaign.emailContent.headline,
            subheadline: campaign.emailContent.subheadline,
            intro: campaign.emailContent.introParagraph,
            body: campaign.emailContent.bodyParagraph,
            features: campaign.emailContent.features,
            offer: campaign.emailContent.offerBox,
            primaryCta: campaign.emailContent.primaryCta,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Error: ${error.message || 'Something went wrong while contacting Gemini. Please verify your connection.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getModelNameForTask = (t: TaskType) => {
    switch (t) {
      case 'complex':
        return 'gemini-3.1-pro-preview';
      case 'fast':
        return 'gemini-3.1-flash-lite';
      case 'general':
      default:
        return 'gemini-3.5-flash';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Campaign Strategist</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40 font-mono">
                {getModelNameForTask(taskType)}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Multi-turn assistant with campaign memory
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Role & Model Selector Ribbon */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800 space-y-2 text-xs">
        {/* Role Selector */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-[11px] font-semibold text-slate-400">Role:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setRole('copywriter')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition ${
                role === 'copywriter'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Creative Copywriter & Hook Specialist"
            >
              <Feather className="w-3 h-3" />
              <span>Copy Doctor</span>
            </button>
            <button
              onClick={() => setRole('strategist')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition ${
                role === 'strategist'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Drip Sequences, Funnels & Segmentation"
            >
              <TrendingUp className="w-3 h-3" />
              <span>Strategist</span>
            </button>
            <button
              onClick={() => setRole('deliverability')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition ${
                role === 'deliverability'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Spam filter audit, compliance & inbox placement"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Deliverability</span>
            </button>
          </div>
        </div>

        {/* Task Complexity / Model Selector */}
        <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-800/60">
          <span className="text-[11px] font-semibold text-slate-400">Task Complexity:</span>
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <button
              onClick={() => setTaskType('complex')}
              className={`px-2 py-0.5 rounded transition ${
                taskType === 'complex'
                  ? 'bg-purple-900/80 text-purple-200 border border-purple-600 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-300'
              }`}
              title="gemini-3.1-pro-preview for complex tasks (deep strategy, drip sequences)"
            >
              Pro (Complex)
            </button>
            <button
              onClick={() => setTaskType('general')}
              className={`px-2 py-0.5 rounded transition ${
                taskType === 'general'
                  ? 'bg-indigo-900/80 text-indigo-200 border border-indigo-600 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-300'
              }`}
              title="gemini-3.5-flash for general tasks (iterating copy, tone tweaks)"
            >
              Flash (General)
            </button>
            <button
              onClick={() => setTaskType('fast')}
              className={`px-2 py-0.5 rounded transition ${
                taskType === 'fast'
                  ? 'bg-amber-900/80 text-amber-200 border border-amber-600 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-300'
              }`}
              title="gemini-3.1-flash-lite for tasks that should happen fast (quick checks, instant variations)"
            >
              Lite (Fast)
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Chat Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm space-y-1.5 ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-slate-800 text-slate-200 rounded-bl-xs border border-slate-700/80'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans text-xs">
                  {m.content}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10 text-[10px] text-slate-400">
                  <span className="opacity-70">{m.timestamp}</span>
                  {!isUser && (
                    <div className="flex items-center gap-1.5">
                      {m.modelUsed && (
                        <span className="font-mono text-[9px] px-1 rounded bg-slate-900/60 text-purple-300">
                          {m.modelUsed}
                        </span>
                      )}
                      <button
                        onClick={() => handleCopy(m.content, m.id)}
                        className="p-1 hover:text-white rounded transition"
                        title="Copy text"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-indigo-500/30 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 text-xs leading-relaxed justify-start">
            <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-800 text-slate-300 rounded-2xl rounded-bl-xs p-3 border border-slate-700 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>Thinking with {getModelNameForTask(taskType)}...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <span className="text-slate-500 shrink-0 text-[10px] font-semibold uppercase">
          Prompts:
        </span>
        <button
          onClick={() => handleSendMessage('Propose a 3-email drip sequence continuing this campaign narrative.', 'complex')}
          className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
        >
          📅 3-part drip sequence
        </button>
        <button
          onClick={() => handleSendMessage('Scan this email for spam triggers and calculate deliverability risks.', 'general')}
          className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
        >
          🛡️ Spam trigger check
        </button>
        <button
          onClick={() => handleSendMessage('Write 3 punchy, urgent alternative headlines right now.', 'fast')}
          className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
        >
          ⚡ Fast headline ideas
        </button>
      </div>

      {/* Input Form */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your email strategist or copy doctor..."
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold transition shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
