import React, { useState } from 'react';
import { Sparkles, Check, Copy, Smartphone, Monitor, Star, Zap, RefreshCw, Edit3 } from 'lucide-react';
import { SubjectLine } from '../types/campaign';

interface SubjectLineLabProps {
  subjectLines: SubjectLine[];
  activeSubjectIndex: number;
  onSelectSubject: (index: number) => void;
  onUpdateSubject: (index: number, updated: Partial<SubjectLine>) => void;
  onGenerateMore: () => Promise<void>;
  isGeneratingMore: boolean;
  companyName: string;
}

export const SubjectLineLab: React.FC<SubjectLineLabProps> = ({
  subjectLines,
  activeSubjectIndex,
  onSelectSubject,
  onUpdateSubject,
  onGenerateMore,
  isGeneratingMore,
  companyName,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const activeSubject = subjectLines[activeSubjectIndex] || subjectLines[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/20 text-amber-400">
              <Zap className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Subject Line Lab & A/B Testing
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            4 psychologically calibrated angles. Select the winning variation or generate more.
          </p>
        </div>

        <button
          onClick={onGenerateMore}
          disabled={isGeneratingMore}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition disabled:opacity-50 self-start sm:self-auto cursor-pointer"
        >
          {isGeneratingMore ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Generating with Flash-Lite...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>+ Generate Variations</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Subject Lines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {subjectLines.map((item, idx) => {
          const isSelected = activeSubjectIndex === idx;
          const isEditing = editingIndex === idx;

          return (
            <div
              key={item.id || idx}
              onClick={() => onSelectSubject(idx)}
              className={`p-4 rounded-xl border transition cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Variation {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-[11px] font-medium text-indigo-300">
                      {item.angle}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-semibold">
                      {item.predictedOpenRate}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-0.5 text-[11px] font-bold text-indigo-400">
                        <Check className="w-3.5 h-3.5" />
                        Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Line text */}
                {isEditing ? (
                  <div className="space-y-2 mt-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={item.subject}
                      onChange={(e) => onUpdateSubject(idx, { subject: e.target.value })}
                      className="w-full bg-slate-950 border border-indigo-500 rounded px-2.5 py-1.5 text-xs text-white"
                      placeholder="Subject line"
                    />
                    <input
                      type="text"
                      value={item.preheader}
                      onChange={(e) => onUpdateSubject(idx, { preheader: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-300"
                      placeholder="Preheader preview snippet"
                    />
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="px-2 py-1 bg-indigo-600 text-white text-[11px] rounded font-semibold"
                    >
                      Done Editing
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                      {item.subject}
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                      <span className="text-slate-500 font-semibold">Preheader:</span> {item.preheader}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] text-slate-500">
                  {item.subject.length} chars (Optimal: 35-50)
                </span>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setEditingIndex(isEditing ? null : idx)}
                    className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
                    title="Edit subject text"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleCopy(`${item.subject}\n${item.preheader}`, item.id)}
                    className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
                    title="Copy subject & preheader"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Realistic Inbox Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            Inbox Appearance Simulator
          </span>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition ${
                previewDevice === 'desktop'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition ${
                previewDevice === 'mobile'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Mock Inbox Row */}
        {previewDevice === 'desktop' ? (
          <div className="bg-white rounded-lg p-3 text-slate-900 border border-slate-200 flex items-center gap-4 text-xs font-sans shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 shrink-0">
              <input type="checkbox" className="rounded text-indigo-600 pointer-events-none" />
              <Star className="w-4 h-4 text-slate-300" />
              <span className="font-bold text-slate-900 w-36 truncate">
                {companyName || 'Brand Co.'}
              </span>
            </div>

            <div className="flex items-baseline gap-2 min-w-0 flex-1 truncate">
              <span className="font-bold text-slate-900 truncate">
                {activeSubject?.subject || 'Subject line here'}
              </span>
              <span className="text-slate-400 font-normal truncate">
                - {activeSubject?.preheader || 'Preheader preview text here'}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 shrink-0">
              9:41 AM
            </div>
          </div>
        ) : (
          <div className="max-w-sm mx-auto bg-white rounded-xl p-3.5 text-slate-900 border border-slate-200 shadow-sm space-y-1 font-sans">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">
                {companyName || 'Brand Co.'}
              </span>
              <span className="text-[10px] text-slate-400">9:41 AM</span>
            </div>
            <div className="font-bold text-xs text-slate-950 truncate">
              {activeSubject?.subject}
            </div>
            <div className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {activeSubject?.preheader}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
