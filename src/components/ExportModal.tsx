import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, FileText, ShieldCheck, Clock } from 'lucide-react';
import { CampaignData } from '../types/campaign';
import { generateResponsiveEmailHtml } from '../utils/exportHtml';
import { generatePlainTextEmail } from '../utils/exportPlainText';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, campaign }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'text'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlContent = generateResponsiveEmailHtml(campaign);
  const textContent = generatePlainTextEmail(campaign);

  const handleCopy = () => {
    const content = activeTab === 'html' ? htmlContent : textContent;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = activeTab === 'html' ? htmlContent : textContent;
    const extension = activeTab === 'html' ? 'html' : 'txt';
    const filename = `${campaign.campaignTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_email.${extension}`;
    const blob = new Blob([content], {
      type: activeTab === 'html' ? 'text/html;charset=utf-8' : 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Export Email Campaign
              </h3>
              <p className="text-xs text-slate-400">
                Cross-client compatible HTML with inline CSS and plain text fallback
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Deliverability & Stats Strip */}
        <div className="p-3 bg-slate-950/90 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] text-slate-400">Deliverability</div>
              <div className="font-bold text-white truncate">{campaign.deliverability.spamScore}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] text-slate-400">Best Send Time</div>
              <div className="font-bold text-white truncate">{campaign.deliverability.bestSendTime}</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
            <FileCode className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] text-slate-400">Client Support</div>
              <div className="font-bold text-white truncate">Gmail, Outlook, iOS</div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-4 pt-3 border-b border-slate-800 bg-slate-900">
          <button
            onClick={() => setActiveTab('html')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'html'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Responsive HTML</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'text'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plain Text</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 flex-1 overflow-hidden flex flex-col">
          <pre className="flex-1 overflow-auto p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono leading-relaxed max-h-[350px]">
            {activeTab === 'html' ? htmlContent : textContent}
          </pre>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {activeTab === 'html' ? `${htmlContent.length} chars` : `${textContent.length} chars`}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download File (.{activeTab === 'html' ? 'html' : 'txt'})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
