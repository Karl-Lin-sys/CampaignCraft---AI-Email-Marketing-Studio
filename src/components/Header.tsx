import React from 'react';
import { Mail, Sparkles, Wand2, Download, Copy, MessageSquareText, Layers, Check } from 'lucide-react';

interface HeaderProps {
  onNewCampaign: () => void;
  onOpenPresets: () => void;
  onOpenExport: () => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  campaignTitle?: string;
  isGenerating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewCampaign,
  onOpenPresets,
  onOpenExport,
  onToggleChat,
  isChatOpen,
  campaignTitle,
  isGenerating,
}) => {
  const [copied, setCopied] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CampaignCraft
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                AI Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block truncate max-w-xs md:max-w-md">
              {campaignTitle || 'End-to-End Email Marketing Campaign Generator'}
            </p>
          </div>
        </div>

        {/* Model tags & badges */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-slate-300">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Gemini
          </span>
          <span className="text-slate-500">&bull;</span>
          <span className="text-indigo-300" title="Image Generation Model">gemini-3-pro-image-preview</span>
          <span className="text-slate-500">&bull;</span>
          <span className="text-purple-300" title="Multi-Turn Chat">gemini-3.1-pro</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            title="Load Pre-built Campaign Templates"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          <button
            onClick={onNewCampaign}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            title="Start New Campaign Prompt"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">New Brief</span>
          </button>

          <button
            onClick={onToggleChat}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isChatOpen
                ? 'bg-purple-600 text-white border-purple-500 shadow-sm shadow-purple-500/25'
                : 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-purple-500/30'
            }`}
            title="Campaign Strategist & Multi-turn Chatbot"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Strategist</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export HTML</span>
          </button>
        </div>
      </div>
    </header>
  );
};
