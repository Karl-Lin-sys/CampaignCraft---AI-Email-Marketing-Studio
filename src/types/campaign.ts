export interface SubjectLine {
  id: string;
  subject: string;
  preheader: string;
  angle: string;
  predictedOpenRate: string;
  isRecommended: boolean;
}

export interface EmailFeature {
  icon: string;
  title: string;
  description: string;
}

export interface OfferBox {
  tag: string;
  title: string;
  discountCode: string;
  details: string;
  urgencyText: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface CtaButton {
  text: string;
  url: string;
}

export interface EmailFooter {
  companyName: string;
  address: string;
  unsubscribeText: string;
}

export interface EmailContent {
  badge: string;
  headline: string;
  subheadline: string;
  heroImagePrompt: string;
  heroImageUrl?: string;
  introParagraph: string;
  bodyParagraph: string;
  features: EmailFeature[];
  offerBox: OfferBox;
  testimonial: Testimonial;
  primaryCta: CtaButton;
  secondaryCta: CtaButton;
  footer: EmailFooter;
}

export interface DeliverabilityAudit {
  spamScore: string;
  bestSendTime: string;
  keyAdvice: string;
}

export interface CampaignData {
  campaignTitle: string;
  theme: string;
  targetAudienceSummary: string;
  subjectLines: SubjectLine[];
  emailContent: EmailContent;
  deliverability: DeliverabilityAudit;
  activeSubjectLineIndex?: number;
}

export type ImageSize = '1K' | '2K' | '4K';
export type AspectRatio = '16:9' | '1:1' | '4:3' | '3:4' | '9:16';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

export type ChatRole = 'copywriter' | 'strategist' | 'deliverability';
export type TaskType = 'complex' | 'general' | 'fast';
