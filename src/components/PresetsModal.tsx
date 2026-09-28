import React from 'react';
import { X, Layers, ArrowRight, Sparkles, Check } from 'lucide-react';
import { CAMPAIGN_PRESETS, CampaignPreset } from '../data/presets';
import { CampaignData } from '../types/campaign';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: CampaignPreset) => void;
  currentTitle?: string;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Campaign Templates & Blueprints
              </h3>
              <p className="text-xs text-slate-400">
                Instantly load proven conversion campaigns across different industries
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

        {/* List of Presets */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
          {CAMPAIGN_PRESETS.map((preset) => {
            const isCurrent = currentTitle === preset.sampleCampaign.campaignTitle;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {preset.category}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <Check className="w-3 h-3" />
                        Loaded
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {preset.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 pt-1">
                    <span>
                      <strong className="text-slate-400">Tone:</strong> {preset.tone.split(',')[0]}
                    </span>
                    <span>&bull;</span>
                    <span>
                      <strong className="text-slate-400">Goal:</strong> {preset.goal.split('&')[0]}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm transition self-stretch sm:self-auto justify-center"
                >
                  <span>Load Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
