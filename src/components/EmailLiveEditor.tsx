import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  Code,
  FileText,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  Edit2,
  Check,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  Star,
  Sliders
} from 'lucide-react';
import { CampaignData, ImageSize, AspectRatio } from '../types/campaign';
import { generateResponsiveEmailHtml } from '../utils/exportHtml';
import { generatePlainTextEmail } from '../utils/exportPlainText';

interface EmailLiveEditorProps {
  campaign: CampaignData;
  onUpdateCampaign: (updater: (prev: CampaignData) => CampaignData) => void;
  onGenerateImage: (params: { prompt: string; imageSize: ImageSize; aspectRatio: AspectRatio }) => Promise<void>;
  isGeneratingImage: boolean;
  onQuickPolish: (text: string, fieldName: string) => Promise<string[]>;
}

export const EmailLiveEditor: React.FC<EmailLiveEditorProps> = ({
  campaign,
  onUpdateCampaign,
  onGenerateImage,
  isGeneratingImage,
  onQuickPolish,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'html' | 'text'>('desktop');
  const [imageSize, setImageSize] = useState<ImageSize>('1K');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [customImagePrompt, setCustomImagePrompt] = useState(
    campaign.emailContent.heroImagePrompt || ''
  );
  const [showImageControls, setShowImageControls] = useState(!campaign.emailContent.heroImageUrl);
  const [copiedCode, setCopiedCode] = useState(false);
  const [polishingField, setPolishingField] = useState<string | null>(null);
  const [polishSuggestions, setPolishSuggestions] = useState<string[]>([]);

  const { emailContent, subjectLines, activeSubjectLineIndex = 0 } = campaign;
  const currentSubject = subjectLines[activeSubjectLineIndex] || subjectLines[0];

  const handleFieldChange = (field: string, value: any) => {
    onUpdateCampaign((prev) => ({
      ...prev,
      emailContent: {
        ...prev.emailContent,
        [field]: value,
      },
    }));
  };

  const handleOfferChange = (key: string, value: string) => {
    onUpdateCampaign((prev) => ({
      ...prev,
      emailContent: {
        ...prev.emailContent,
        offerBox: {
          ...prev.emailContent.offerBox,
          [key]: value,
        },
      },
    }));
  };

  const handlePolish = async (text: string, fieldName: string) => {
    try {
      setPolishingField(fieldName);
      const suggestions = await onQuickPolish(text, fieldName);
      setPolishSuggestions(suggestions);
    } catch (err) {
      console.error(err);
    } finally {
      setPolishingField(null);
    }
  };

  const handleApplyPolish = (field: string, newText: string) => {
    handleFieldChange(field, newText);
    setPolishSuggestions([]);
  };

  const htmlSource = generateResponsiveEmailHtml(campaign);
  const textSource = generatePlainTextEmail(campaign);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Top Toolbar */}
      <div className="border-b border-slate-800 p-3 sm:p-4 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Email Canvas
          </span>
          <span className="hidden sm:inline text-xs text-slate-400">
            &bull; Live In-Place Editor & Visualizer
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'desktop'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'mobile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile (375px)</span>
          </button>
          <button
            onClick={() => setViewMode('html')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'html'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>HTML</span>
          </button>
          <button
            onClick={() => setViewMode('text')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'text'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plain Text</span>
          </button>
        </div>
      </div>

      {/* Code / Text Mode Views */}
      {viewMode === 'html' && (
        <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 relative">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-slate-400">
            <span>Responsive Email HTML (Ready for Klaviyo, Mailchimp, SendGrid)</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(htmlSource);
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied HTML' : 'Copy HTML'}</span>
            </button>
          </div>
          <pre className="max-h-[600px] overflow-auto p-4 bg-slate-900 rounded-lg text-[11px] leading-relaxed text-slate-200">
            {htmlSource}
          </pre>
        </div>
      )}

      {viewMode === 'text' && (
        <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 relative">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-slate-400">
            <span>Plain Text Email Version</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(textSource);
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied Text' : 'Copy Text'}</span>
            </button>
          </div>
          <pre className="max-h-[600px] overflow-auto p-4 bg-slate-900 rounded-lg text-xs leading-relaxed text-slate-200 whitespace-pre-wrap">
            {textSource}
          </pre>
        </div>
      )}

      {/* Visual Email Preview Area */}
      {(viewMode === 'desktop' || viewMode === 'mobile') && (
        <div className="p-4 sm:p-8 bg-slate-950/80 flex justify-center items-start min-h-[700px] overflow-x-auto">
          {/* Email Container Frame */}
          <div
            className={`w-full transition-all duration-300 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans ${
              viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-[620px]'
            }`}
          >
            {/* Inbox header info strip */}
            <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2.5 text-xs text-slate-600 flex items-center justify-between">
              <div className="truncate">
                <span className="font-bold text-slate-800">{emailContent.footer.companyName}</span>
                <span className="text-slate-400 ml-1.5 truncate">&lt;newsletter@{emailContent.footer.companyName.toLowerCase().replace(/[^a-z]/g, '') || 'brand'}.com&gt;</span>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0">Now</span>
            </div>

            {/* Subject line strip */}
            <div className="px-4 py-2 border-b border-slate-100 bg-white">
              <div className="text-xs font-bold text-slate-900 truncate">
                {currentSubject.subject}
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {currentSubject.preheader}
              </div>
            </div>

            {/* Email Body Content */}
            <div className="p-5 sm:p-8 space-y-6">
              {/* Badge */}
              <div className="text-center">
                <input
                  type="text"
                  value={emailContent.badge}
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                  className="inline-block text-center bg-indigo-50 text-indigo-700 font-bold text-[11px] tracking-wider uppercase px-3 py-1 rounded-full border border-indigo-200/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Headline */}
              <div className="text-center relative group">
                <textarea
                  value={emailContent.headline}
                  onChange={(e) => handleFieldChange('headline', e.target.value)}
                  rows={2}
                  className="w-full text-center font-extrabold text-2xl sm:text-3xl text-slate-950 leading-tight tracking-tight border border-transparent hover:border-slate-300 focus:border-indigo-500 rounded-lg p-1 resize-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handlePolish(emailContent.headline, 'headline')}
                  className="opacity-0 group-hover:opacity-100 transition absolute -right-2 top-0 p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                  title="Polish headline with Gemini"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subheadline */}
              <div className="text-center">
                <textarea
                  value={emailContent.subheadline}
                  onChange={(e) => handleFieldChange('subheadline', e.target.value)}
                  rows={2}
                  className="w-full text-center text-sm sm:text-base text-slate-600 leading-relaxed border border-transparent hover:border-slate-300 focus:border-indigo-500 rounded-lg p-1 resize-none focus:outline-none"
                />
              </div>

              {/* Hero Image Section with gemini-3-pro-image-preview and 1K, 2K, 4K Affordance */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden">
                {emailContent.heroImageUrl ? (
                  <div className="relative group">
                    <img
                      src={emailContent.heroImageUrl}
                      alt={emailContent.headline}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover rounded-t-xl max-h-[380px]"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition bg-slate-900/80 backdrop-blur-md p-1 rounded-lg">
                      <button
                        onClick={() => setShowImageControls(!showImageControls)}
                        className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold rounded flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Regenerate Visual
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center bg-gradient-to-b from-indigo-50/60 to-purple-50/60 border-b border-indigo-100">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      Hero Campaign Visual
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-3">
                      Generate campaign-tailored visuals using <strong className="text-indigo-600">gemini-3-pro-image-preview</strong>
                    </p>
                  </div>
                )}

                {/* Explicit Affordance Controls for gemini-3-pro-image-preview & 1K, 2K, 4K */}
                <div className="p-3 sm:p-4 bg-slate-100 border-t border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">
                        Image Generator
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold border border-purple-200">
                        gemini-3-pro-image-preview
                      </span>
                    </div>

                    {/* Image Size (1K, 2K, 4K) Buttons */}
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-semibold text-slate-600 mr-1">Size:</span>
                      {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setImageSize(size)}
                          className={`px-2.5 py-1 text-xs font-bold rounded transition border ${
                            imageSize === size
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Textarea */}
                  <div>
                    <textarea
                      value={customImagePrompt || emailContent.heroImagePrompt}
                      onChange={(e) => {
                        setCustomImagePrompt(e.target.value);
                        handleFieldChange('heroImagePrompt', e.target.value);
                      }}
                      placeholder="Image generation prompt..."
                      rows={2}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Generate Button */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500">
                      Aspect: {aspectRatio} &bull; Res: {imageSize}
                    </span>
                    <button
                      type="button"
                      disabled={isGeneratingImage}
                      onClick={() =>
                        onGenerateImage({
                          prompt: customImagePrompt || emailContent.heroImagePrompt,
                          imageSize,
                          aspectRatio,
                        })
                      }
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {isGeneratingImage ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Image ({imageSize})...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>
                            {emailContent.heroImageUrl ? 'Regenerate with gemini-3-pro' : 'Generate Visual with gemini-3-pro'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Polish Suggestions Drawer if active */}
              {polishSuggestions.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span>Gemini Copy Polish Suggestions</span>
                    <button
                      onClick={() => setPolishSuggestions([])}
                      className="text-amber-700 hover:text-amber-900 font-semibold"
                    >
                      Dismiss
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {polishSuggestions.map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleApplyPolish('headline', s.replace(/^[-•\d.]\s*/, ''))}
                        className="p-2 bg-white rounded border border-amber-200/80 hover:border-indigo-400 cursor-pointer text-slate-800 transition text-[11px]"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Intro Paragraph */}
              <div>
                <textarea
                  value={emailContent.introParagraph}
                  onChange={(e) => handleFieldChange('introParagraph', e.target.value)}
                  rows={3}
                  className="w-full text-slate-700 text-sm leading-relaxed border border-transparent hover:border-slate-300 focus:border-indigo-500 rounded-lg p-1 resize-none focus:outline-none"
                />
              </div>

              {/* Body Paragraph */}
              <div>
                <textarea
                  value={emailContent.bodyParagraph}
                  onChange={(e) => handleFieldChange('bodyParagraph', e.target.value)}
                  rows={3}
                  className="w-full text-slate-600 text-xs sm:text-sm leading-relaxed border border-transparent hover:border-slate-300 focus:border-indigo-500 rounded-lg p-1 resize-none focus:outline-none"
                />
              </div>

              {/* Feature Highlights Grid */}
              <div className="space-y-2.5">
                {emailContent.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => {
                          const updated = [...emailContent.features];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          handleFieldChange('features', updated);
                        }}
                        className="w-full font-bold text-xs sm:text-sm text-slate-900 border border-transparent hover:border-slate-300 rounded px-1"
                      />
                      <textarea
                        value={feat.description}
                        onChange={(e) => {
                          const updated = [...emailContent.features];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          handleFieldChange('features', updated);
                        }}
                        rows={1}
                        className="w-full text-xs text-slate-500 border border-transparent hover:border-slate-300 rounded px-1 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Offer Voucher Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-pink-50/30 border-2 border-dashed border-indigo-300 text-center space-y-2">
                <input
                  type="text"
                  value={emailContent.offerBox.tag}
                  onChange={(e) => handleOfferChange('tag', e.target.value)}
                  className="text-center font-bold text-[10px] tracking-wider text-indigo-700 uppercase bg-transparent border-b border-transparent hover:border-indigo-300"
                />
                <input
                  type="text"
                  value={emailContent.offerBox.title}
                  onChange={(e) => handleOfferChange('title', e.target.value)}
                  className="w-full text-center font-extrabold text-base sm:text-lg text-slate-900 bg-transparent border-b border-transparent hover:border-indigo-300"
                />
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  {emailContent.offerBox.details}
                </p>

                {/* Coupon Code Block */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-indigo-200 shadow-sm font-mono font-extrabold text-indigo-700 tracking-wider text-sm sm:text-base">
                    <span>{emailContent.offerBox.discountCode}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(emailContent.offerBox.discountCode)}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded transition"
                      title="Copy promo code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-[11px] font-bold text-rose-600 pt-1">
                  {emailContent.offerBox.urgencyText}
                </div>
              </div>

              {/* Primary Call to Action Button */}
              <div className="text-center pt-2">
                <div className="inline-block w-full sm:w-auto">
                  <input
                    type="text"
                    value={emailContent.primaryCta.text}
                    onChange={(e) =>
                      onUpdateCampaign((prev) => ({
                        ...prev,
                        emailContent: {
                          ...prev.emailContent,
                          primaryCta: { ...prev.emailContent.primaryCta, text: e.target.value },
                        },
                      }))
                    }
                    className="w-full sm:w-auto text-center px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 border-0 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="pt-3">
                  <input
                    type="text"
                    value={emailContent.secondaryCta.text}
                    onChange={(e) =>
                      onUpdateCampaign((prev) => ({
                        ...prev,
                        emailContent: {
                          ...prev.emailContent,
                          secondaryCta: { ...prev.emailContent.secondaryCta, text: e.target.value },
                        },
                      }))
                    }
                    className="text-center text-xs font-semibold text-indigo-600 hover:underline bg-transparent"
                  />
                </div>
              </div>

              {/* Testimonial Box */}
              <div className="p-4 bg-slate-50 border-l-4 border-indigo-600 rounded-r-xl space-y-1 text-xs">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="italic text-slate-700">
                  "{emailContent.testimonial.quote}"
                </p>
                <div className="font-bold text-slate-900 pt-1">
                  {emailContent.testimonial.author}
                  <span className="font-normal text-slate-500 ml-1.5">
                    — {emailContent.testimonial.role}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-slate-100 text-center space-y-1.5 text-[11px] text-slate-400">
                <p>
                  {emailContent.footer.companyName} &bull; {emailContent.footer.address}
                </p>
                <p className="text-[10px] text-slate-400">
                  {emailContent.footer.unsubscribeText}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
