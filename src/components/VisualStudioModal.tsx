import React, { useState } from 'react';
import {
  X,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Download,
  Check,
  Sliders,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ImageSize, AspectRatio, CampaignData } from '../types/campaign';

interface VisualStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignData;
  onApplyImageToHero: (imageUrl: string) => void;
  onGenerateImageApi: (params: {
    prompt: string;
    imageSize: ImageSize;
    aspectRatio: AspectRatio;
  }) => Promise<string>;
}

export const VisualStudioModal: React.FC<VisualStudioModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onApplyImageToHero,
  onGenerateImageApi,
}) => {
  const [prompt, setPrompt] = useState(campaign.emailContent.heroImagePrompt || '');
  const [imageSize, setImageSize] = useState<ImageSize>('1K');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<
    Array<{ url: string; size: ImageSize; ratio: AspectRatio; prompt: string }>
  >(
    campaign.emailContent.heroImageUrl
      ? [
          {
            url: campaign.emailContent.heroImageUrl,
            size: '1K',
            ratio: '16:9',
            prompt: campaign.emailContent.heroImagePrompt,
          },
        ]
      : []
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const url = await onGenerateImageApi({
        prompt: prompt.trim(),
        imageSize,
        aspectRatio,
      });

      setGeneratedImages((prev) => [
        { url, size: imageSize, ratio: aspectRatio, prompt: prompt.trim() },
        ...prev,
      ]);
      setActiveImageIndex(0);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to generate visual');
    } finally {
      setIsGenerating(false);
    }
  };

  const currentImage = generatedImages[activeImageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Visual Studio & Image Generator
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800/40">
                  gemini-3-pro-image-preview
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate high-resolution marketing assets with configurable 1K, 2K, and 4K dimensions
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

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (left 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Prompt */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                <span>Visual Description & Prompt</span>
                <span className="text-[10px] text-indigo-400 font-normal">
                  Advertising Quality
                </span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Detailed scene description, lighting, composition, materials, color palette..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
              />
            </div>

            {/* Resolution Selector (1K, 2K, 4K) */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <label className="block text-xs font-bold text-slate-200 mb-2 flex items-center justify-between">
                <span>Image Resolution (Affordance)</span>
                <span className="text-[10px] text-slate-400 font-mono">gemini-3-pro</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setImageSize(size)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border ${
                      imageSize === size
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/25'
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

            {/* Aspect Ratio Selector */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <label className="block text-xs font-bold text-slate-200 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '16:9', label: '16:9', sub: 'Hero Banner' },
                  { id: '1:1', label: '1:1', sub: 'Product Square' },
                  { id: '4:3', label: '4:3', sub: 'Card Photo' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAspectRatio(item.id as AspectRatio)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border ${
                      aspectRatio === item.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/25'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] font-normal opacity-70">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-200 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing ({imageSize} Resolution)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate with gemini-3-pro-image-preview</span>
                </>
              )}
            </button>
          </div>

          {/* Preview & Gallery Column (right 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Main Active Image Display */}
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
              {currentImage ? (
                <div className="space-y-3 w-full flex flex-col items-center">
                  <img
                    src={currentImage.url}
                    alt={currentImage.prompt}
                    referrerPolicy="no-referrer"
                    className="max-h-[320px] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-slate-800"
                  />
                  <div className="flex items-center justify-between w-full text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="font-mono">
                      Res: <strong className="text-white">{currentImage.size}</strong> &bull; Ratio: <strong className="text-white">{currentImage.ratio}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={currentImage.url}
                        download="campaign_visual.png"
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
                        title="Download image"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          onApplyImageToHero(currentImage.url);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Insert in Email Hero</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">No Visual Generated Yet</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Configure your resolution (1K, 2K, 4K) and prompt on the left, then click Generate to preview.
                  </p>
                </div>
              )}
            </div>

            {/* Gallery thumbnails if multiple */}
            {generatedImages.length > 1 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Generated History ({generatedImages.length})
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {generatedImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative rounded-lg overflow-hidden shrink-0 border-2 transition ${
                        activeImageIndex === idx
                          ? 'border-indigo-500 ring-2 ring-indigo-500/40'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt="thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover"
                      />
                      <span className="absolute bottom-0 right-0 bg-slate-900/90 text-[9px] font-mono font-bold px-1 rounded-tl text-white">
                        {img.size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
