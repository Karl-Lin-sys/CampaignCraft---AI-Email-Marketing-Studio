import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, Image as ImageIcon, Sliders, ChevronDown, ChevronUp, Check, Layers, RefreshCw } from 'lucide-react';
import { ImageSize, AspectRatio } from '../types/campaign';

interface CampaignPromptFormProps {
  onGenerate: (params: {
    prompt: string;
    audience: string;
    tone: string;
    goal: string;
    ctaText: string;
    visualStyle: string;
    imageSize: ImageSize;
    aspectRatio: AspectRatio;
  }) => Promise<void>;
  isGenerating: boolean;
  activePresetId?: string;
  onSelectPresetPrompt: (prompt: string, title?: string) => void;
}

const INSPIRATION_PROMPTS = [
  {
    title: 'Cold Brew Coffee Launch',
    prompt: 'Product launch for artisan Japanese-style cold brew maker, 20% off early bird coupon, sleek glass and brass design, summer morning vibes.',
    tag: 'E-Commerce',
  },
  {
    title: 'SaaS AI Workflow Agent',
    prompt: 'B2B SaaS launch for an AI workflow automation tool that cuts repetitive spreadsheet and CRM tasks by 80%. 14-day free trial, no credit card required.',
    tag: 'SaaS / Tech',
  },
  {
    title: 'Biometric Smart Ring Sale',
    prompt: '48-hour flash sale for AuraRing titanium health tracker. $70 off plus free lifetime membership. Focus on sleep tracking, HRV, and screen-free wellness.',
    tag: 'Hardware',
  },
  {
    title: 'VIP Win-back & Loyalty',
    prompt: 'Re-engagement win-back email for loyal customers who haven\'t purchased in 60 days. Surprise $25 gift credit, personalized product recommendations.',
    tag: 'Retention',
  },
];

const AUDIENCES = [
  'General High-Intent Buyers',
  'Busy Professionals & Executives',
  'Design & Coffee Enthusiasts',
  'Tech Founders & Operations Leads',
  'Health & Biohacking Seekers',
  'Budget-Conscious Shoppers',
  'VIP & Repeat Loyal Customers',
];

const TONES = [
  'Persuasive, Sensorial & Urgent',
  'Warm, Relatable & Friendly',
  'Sleek, Authoritative & ROI-Focused',
  'Playful, Witty & Irreverent',
  'Luxury, Minimalist & Prestigious',
  'Direct, Punchy & High-Energy',
];

const GOALS = [
  'Direct Product Sales & Conversions',
  'Product Launch & Early Access Waitlist',
  'Free Trial Signups & Demo Bookings',
  'Cart Abandonment & Win-Back Recovery',
  'Webinar & Event Registrations',
];

export const CampaignPromptForm: React.FC<CampaignPromptFormProps> = ({
  onGenerate,
  isGenerating,
  onSelectPresetPrompt,
}) => {
  const [prompt, setPrompt] = useState(
    'Product launch for an artisan Japanese-style cold brew coffee maker, 20% off early bird coupon, sleek glass & brass design, summer vibes.'
  );
  const [audience, setAudience] = useState('Coffee enthusiasts, work-from-home professionals, design-conscious foodies');
  const [tone, setTone] = useState('Persuasive, Sensorial & Sophisticated');
  const [goal, setGoal] = useState('Direct Product Sales & Early Bird Conversions');
  const [ctaText, setCtaText] = useState('Claim Your 20% Early Bird Maker');
  const [visualStyle, setVisualStyle] = useState('Warm Editorial Photography, Sunlight streaming through glass, Amber Coffee');
  
  // Explicit requirement: Image generation using model gemini-3-pro-image-preview with affordance for 1K, 2K, 4K
  const [imageSize, setImageSize] = useState<ImageSize>('1K');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate({
      prompt: prompt.trim(),
      audience,
      tone,
      goal,
      ctaText,
      visualStyle,
      imageSize,
      aspectRatio,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
        {/* Top header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Wand2 className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-white tracking-tight">
                Campaign Brief Generator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter any product, offer, or announcement to generate copy, A/B subject lines, and high-res imagery.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] text-slate-400 font-medium">Model:</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
              gemini-3.5-flash
            </span>
          </div>
        </div>

        {/* Prompt Input Box */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span>What are you promoting or announcing?</span>
            <span className="text-[11px] text-slate-500 font-normal">
              {prompt.length} chars
            </span>
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Summer sale on lightweight trail running shoes, 30% off with code TRAIL30, breathable mesh, waterproof sole, vibrant mountain adventure vibes..."
              rows={3}
              required
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Quick Inspiration Prompts */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Quick Inspiration
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {INSPIRATION_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(item.prompt);
                  onSelectPresetPrompt(item.prompt, item.title);
                }}
                className="text-left p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition group cursor-pointer"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition truncate">
                    {item.title}
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium shrink-0">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {item.prompt}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Assets Spec & Image Size Affordance */}
        <div className="bg-slate-950/80 border border-indigo-900/40 rounded-xl p-3.5 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/20 text-indigo-400">
                <ImageIcon className="w-3.5 h-3.5" />
              </span>
              <div>
                <span className="text-xs font-bold text-white">
                  Visual Generation Settings
                </span>
                <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/50">
                  gemini-3-pro-image-preview
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400">
              High-definition email hero banner
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Size Selection (1K, 2K, 4K) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Image Resolution Target
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setImageSize(size)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border ${
                      imageSize === size
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/30'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{size}</span>
                    <span className="text-[9px] font-normal opacity-70">
                      {size === '1K' ? '1024px' : size === '2K' ? '2048px (HD)' : '4096px (Ultra)'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: '16:9', label: '16:9', sub: 'Hero Banner' },
                  { id: '1:1', label: '1:1', sub: 'Product Square' },
                  { id: '4:3', label: '4:3', sub: 'Editorial Card' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAspectRatio(item.id as AspectRatio)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border ${
                      aspectRatio === item.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/30'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] font-normal opacity-70">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Advanced Targeting Options */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Targeting & Voice Customization (Audience, Tone, Goal, CTA)
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="p-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {AUDIENCES.slice(0, 3).map((a, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAudience(a)}
                      className="text-[10px] text-slate-400 hover:text-indigo-300 bg-slate-800/80 px-1.5 py-0.5 rounded transition"
                    >
                      +{a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tone of Voice
                </label>
                <input
                  type="text"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {TONES.slice(0, 3).map((t, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTone(t)}
                      className="text-[10px] text-slate-400 hover:text-indigo-300 bg-slate-800/80 px-1.5 py-0.5 rounded transition"
                    >
                      +{t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Campaign Goal
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Desired Call to Action Button
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Generate Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <span>Generates 4 subject lines, hero image prompt, rich copy & deliverability audit</span>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition transform active:scale-98 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Crafting Campaign with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Complete Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
