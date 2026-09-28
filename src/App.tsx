import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  Zap,
  Image as ImageIcon,
  MessageSquareText,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Layers,
  ArrowRight,
  ExternalLink,
  Code,
  Download,
  Copy,
  RefreshCw,
  Eye,
  Check
} from 'lucide-react';
import { CampaignData, ImageSize, AspectRatio, SubjectLine } from './types/campaign';
import { CAMPAIGN_PRESETS, CampaignPreset } from './data/presets';
import { Header } from './components/Header';
import { CampaignPromptForm } from './components/CampaignPromptForm';
import { SubjectLineLab } from './components/SubjectLineLab';
import { EmailLiveEditor } from './components/EmailLiveEditor';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { PresetsModal } from './components/PresetsModal';
import { ExportModal } from './components/ExportModal';
import { VisualStudioModal } from './components/VisualStudioModal';

export default function App() {
  // Start with the first curated preset (Artisan Cold Brew Launch) so user immediately has full working campaign
  const [campaign, setCampaign] = useState<CampaignData>(CAMPAIGN_PRESETS[0].sampleCampaign);
  const [activeTab, setActiveTab] = useState<'editor' | 'subjects' | 'brief'>('editor');
  
  // Loading states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingMoreSubjects, setIsGeneratingMoreSubjects] = useState(false);

  // Modal & Drawer states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isVisualStudioOpen, setIsVisualStudioOpen] = useState(false);

  // Toast alert state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Generate complete campaign from prompt
  const handleGenerateCampaign = async (params: {
    prompt: string;
    audience: string;
    tone: string;
    goal: string;
    ctaText: string;
    visualStyle: string;
    imageSize: ImageSize;
    aspectRatio: AspectRatio;
  }) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/campaign/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate campaign');
      }

      if (data.campaign) {
        setCampaign({
          ...data.campaign,
          activeSubjectLineIndex: 0,
        });
        setActiveTab('editor');
        showToast('Campaign crafted successfully with Gemini!');

        // Automatically trigger image generation for the hero visual using gemini-3-pro-image-preview
        if (data.campaign.emailContent?.heroImagePrompt) {
          handleGenerateImage({
            prompt: data.campaign.emailContent.heroImagePrompt,
            imageSize: params.imageSize,
            aspectRatio: params.aspectRatio,
          });
        }
      }
    } catch (err: any) {
      console.error('Error generating campaign:', err);
      showToast(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate image using gemini-3-pro-image-preview with 1K, 2K, 4K affordance
  const handleGenerateImage = async (params: {
    prompt: string;
    imageSize: ImageSize;
    aspectRatio: AspectRatio;
  }) => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch('/api/campaign/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Image generation failed');
      }

      if (data.imageUrl) {
        setCampaign((prev) => ({
          ...prev,
          emailContent: {
            ...prev.emailContent,
            heroImageUrl: data.imageUrl,
            heroImagePrompt: params.prompt,
          },
        }));
        showToast(`Image generated with gemini-3-pro (${params.imageSize} resolution)!`);
      }
    } catch (err: any) {
      console.error('Error in handleGenerateImage:', err);
      showToast(`Image generation notice: ${err.message}`);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Standalone image generator function for VisualStudio modal
  const handleGenerateImageApi = async (params: {
    prompt: string;
    imageSize: ImageSize;
    aspectRatio: AspectRatio;
  }): Promise<string> => {
    const response = await fetch('/api/campaign/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Image generation failed');
    }
    return data.imageUrl;
  };

  // Quick polish text using gemini-3.1-flash-lite
  const handleQuickPolish = async (text: string, fieldName: string): Promise<string[]> => {
    const response = await fetch('/api/campaign/polish-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, fieldName }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Polish failed');
    }

    const suggestions = (data.suggestions || '')
      .split('\n')
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);

    return suggestions;
  };

  // Generate more subject lines using fast model
  const handleGenerateMoreSubjects = async () => {
    setIsGeneratingMoreSubjects(true);
    try {
      const response = await fetch('/api/campaign/polish-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: campaign.subjectLines.map((s) => s.subject).join(' | '),
          fieldName: 'subject lines with psychological open triggers',
          goal: 'create 3 high-converting alternative subject lines',
        }),
      });

      const data = await response.json();
      if (data.suggestions) {
        const lines = data.suggestions
          .split('\n')
          .filter((l: string) => l.trim().length > 0)
          .slice(0, 3)
          .map((line: string, i: number) => ({
            id: `more-${Date.now()}-${i}`,
            subject: line.replace(/^[-•\d.]\s*/, ''),
            preheader: 'Special limited time update inside',
            angle: 'Curiosity & Novelty',
            predictedOpenRate: '32% - High',
            isRecommended: false,
          }));

        setCampaign((prev) => ({
          ...prev,
          subjectLines: [...prev.subjectLines, ...lines],
        }));
        showToast('Generated 3 fresh subject line variations!');
      }
    } catch (err: any) {
      console.error(err);
      showToast('Failed to generate extra subjects.');
    } finally {
      setIsGeneratingMoreSubjects(false);
    }
  };

  const handleSelectPreset = (preset: CampaignPreset) => {
    setCampaign(preset.sampleCampaign);
    setActiveTab('editor');
    showToast(`Loaded template: "${preset.name}"`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-slate-100 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        onNewCampaign={() => setActiveTab('brief')}
        onOpenPresets={() => setIsPresetsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
        campaignTitle={campaign.campaignTitle}
        isGenerating={isGenerating}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Canvas & Visuals</span>
            </button>

            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'subjects'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Subject Line Lab ({campaign.subjectLines.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('brief')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'brief'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompt Brief & Generator</span>
            </button>
          </div>

          {/* Quick Stats & Visual Studio Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVisualStudioOpen(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
              <span>Visual Studio (1K, 2K, 4K)</span>
            </button>

            <button
              onClick={() => setIsChatOpen(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-purple-300 flex items-center gap-1.5 transition cursor-pointer"
            >
              <MessageSquareText className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Consult Strategist</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Email Canvas & Visuals */}
        {activeTab === 'editor' && (
          <div className="space-y-6">
            <EmailLiveEditor
              campaign={campaign}
              onUpdateCampaign={setCampaign}
              onGenerateImage={handleGenerateImage}
              isGeneratingImage={isGeneratingImage}
              onQuickPolish={handleQuickPolish}
            />
          </div>
        )}

        {/* Tab 2: Subject Line Lab & Inbox Simulator */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <SubjectLineLab
              subjectLines={campaign.subjectLines}
              activeSubjectIndex={campaign.activeSubjectLineIndex || 0}
              onSelectSubject={(index) =>
                setCampaign((prev) => ({ ...prev, activeSubjectLineIndex: index }))
              }
              onUpdateSubject={(index, updated) =>
                setCampaign((prev) => {
                  const copy = [...prev.subjectLines];
                  copy[index] = { ...copy[index], ...updated };
                  return { ...prev, subjectLines: copy };
                })
              }
              onGenerateMore={handleGenerateMoreSubjects}
              isGeneratingMore={isGeneratingMoreSubjects}
              companyName={campaign.emailContent.footer.companyName}
            />
          </div>
        )}

        {/* Tab 3: Prompt Brief & Generator */}
        {activeTab === 'brief' && (
          <div className="space-y-6">
            <CampaignPromptForm
              onGenerate={handleGenerateCampaign}
              isGenerating={isGenerating}
              onSelectPresetPrompt={(promptText) => {
                showToast('Preset brief selected. Click Generate to craft new copy & visuals.');
              }}
            />
          </div>
        )}
      </main>

      {/* Multi-turn Chatbot Drawer (Always accessible floating side assistant) */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        campaign={campaign}
      />

      {/* Templates / Presets Modal */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
        currentTitle={campaign.campaignTitle}
      />

      {/* Export HTML / Plain Text Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        campaign={campaign}
      />

      {/* Visual Studio Modal (Dedicated image generation & 1K, 2K, 4K controls) */}
      <VisualStudioModal
        isOpen={isVisualStudioOpen}
        onClose={() => setIsVisualStudioOpen(false)}
        campaign={campaign}
        onApplyImageToHero={(url) => {
          setCampaign((prev) => ({
            ...prev,
            emailContent: { ...prev.emailContent, heroImageUrl: url },
          }));
          showToast('Applied visual to campaign hero banner!');
        }}
        onGenerateImageApi={handleGenerateImageApi}
      />
    </div>
  );
}
