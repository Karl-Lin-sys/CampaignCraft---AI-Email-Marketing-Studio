import { CampaignData } from '../types/campaign';

export interface CampaignPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  prompt: string;
  audience: string;
  tone: string;
  goal: string;
  ctaText: string;
  visualStyle: string;
  sampleCampaign: CampaignData;
}

export const CAMPAIGN_PRESETS: CampaignPreset[] = [
  {
    id: 'artisan-coffee',
    name: 'Artisan Cold Brew Launch',
    category: 'E-Commerce / Food & Beverage',
    description: 'Summer cold brew maker product launch with early bird 20% discount.',
    prompt: 'Product launch for an artisan Japanese-style cold brew coffee maker, 20% off early bird coupon, sleek glass & brass design, summer vibes.',
    audience: 'Coffee enthusiasts, work-from-home professionals, design-conscious foodies',
    tone: 'Persuasive, Sensorial & Sophisticated',
    goal: 'Direct Product Sales & Early Bird Conversions',
    ctaText: 'Claim Your 20% Early Bird Maker',
    visualStyle: 'Warm Editorial Photography, Sunlight streaming through glass, Amber Coffee',
    sampleCampaign: {
      campaignTitle: 'AeroSteep Cold Brew: Summer Reserve Launch',
      theme: 'Precision-brewed tranquility in your own kitchen',
      targetAudienceSummary: 'Connoisseurs seeking cafe-quality low-acid cold brew with minimalist aesthetic kitchenware.',
      subjectLines: [
        {
          id: 's1',
          subject: 'Your mornings just got 16 hours smoother ☕',
          preheader: 'Meet AeroSteep: The slow-drip glass maker + 20% early access',
          angle: 'Benefit & Sensory Hook',
          predictedOpenRate: '36% - Very High',
          isRecommended: true,
        },
        {
          id: 's2',
          subject: 'Cold brew shouldn\'t taste bitter. Here is the fix.',
          preheader: 'Japanese slow-drip extraction is officially here',
          angle: 'Curiosity & Problem/Solution',
          predictedOpenRate: '31% - High',
          isRecommended: false,
        },
        {
          id: 's3',
          subject: '20% off: The first 500 AeroSteep units ship this week',
          preheader: 'Use code BREW20 before Sunday midnight',
          angle: 'Scarcity & Discount Urgency',
          predictedOpenRate: '33% - Very High',
          isRecommended: false,
        },
        {
          id: 's4',
          subject: 'Meet AeroSteep (It\'s finally here)',
          preheader: 'Limited summer reserve batch now open',
          angle: 'Direct Announcement',
          predictedOpenRate: '28% - Moderate',
          isRecommended: false,
        },
      ],
      emailContent: {
        badge: 'NEW PRODUCT RELEASE',
        headline: 'Cafe-Quality Cold Brew, Handcrafted on Your Countertop',
        subheadline: 'Zero bitterness. 60% less acidity. 100% pure velvety richness.',
        heroImagePrompt: 'Artisan borosilicate glass and brushed brass cold brew maker resting on a sunlit marble kitchen counter, golden morning light filtering through linen curtains, rich amber coffee dripping into a minimalist carafe, condensation droplets on glass, commercial luxury product photography, 8k resolution',
        heroImageUrl: '',
        introParagraph: 'Most cold brew tastes flat because immersion brewing over-extracts harsh tannins. We spent 18 months re-engineering the Japanese slow-drip method into a countertop showpiece that extracts sweet floral notes and chocolate undertones effortlessly.',
        bodyParagraph: 'Each AeroSteep unit is crafted from thermal-shock resistant borosilicate glass and calibrated with a micro-metered brass valve. Fill the tower with ice-cold spring water, adjust the drip to 1 drop every 2 seconds, and wake up to 32 ounces of liquid silk.',
        features: [
          {
            icon: 'clock',
            title: 'Precision Micro-Valve',
            description: 'Maintains an exact 1-drop-per-second drip cadence for maximum flavor extraction.',
          },
          {
            icon: 'spark',
            title: 'Laser-Etched Titanium Filter',
            description: 'Zero paper waste, zero sediment, letting only natural aromatic oils through.',
          },
          {
            icon: 'shield',
            title: 'Thermal-Resistant Glass',
            description: 'Laboratory-grade borosilicate holds temperature and resists thermal shock.',
          },
        ],
        offerBox: {
          tag: 'EXCLUSIVE LAUNCH SAVINGS',
          title: 'Save 20% on the First Batch',
          discountCode: 'SUMMERDRIP20',
          details: 'Valid for the first 500 orders or until Sunday at 11:59 PM. Includes complimentary single-origin Ethiopian beans sample.',
          urgencyText: '⚡ Only 140/500 units remaining in stock',
        },
        testimonial: {
          quote: 'I stopped spending $7 every single morning at local specialty shops. The clarity of flavor out of this dripper is unbelievable.',
          author: 'Marcus Vance',
          role: 'Verified Specialty Coffee Q-Grader',
          rating: 5,
        },
        primaryCta: {
          text: 'Claim Your 20% Early Bird Maker',
          url: 'https://example.com/aerosteep-launch',
        },
        secondaryCta: {
          text: 'Watch the 60-Second Brewing Demo',
          url: 'https://example.com/video',
        },
        footer: {
          companyName: 'AeroSteep Roasters & Craft Goods',
          address: '450 Roastery Blvd, Portland, OR 97201',
          unsubscribeText: 'You received this email because you opted into early reserve access. Manage preferences or unsubscribe.',
        },
      },
      deliverability: {
        spamScore: 'Low (97/100 Deliverability Rating)',
        bestSendTime: 'Thursday 8:45 AM (Coffee & morning routine prime window)',
        keyAdvice: 'Ensure image alt tags describe the brewer. Segment your list to recent purchasers vs new subscribers for best conversion.',
      },
    },
  },
  {
    id: 'saas-ai-assistant',
    name: 'SaaS AI Automation Launch',
    category: 'B2B / Technology & SaaS',
    description: 'Announcing an AI autonomous workflow agent with a 14-day free trial.',
    prompt: 'B2B SaaS launch for an AI workflow automation tool that cuts repetitive spreadsheet & CRM tasks by 80%. Free 14-day trial, no credit card required.',
    audience: 'Operations managers, sales leaders, founders, startup operators',
    tone: 'Sleek, Authoritative & ROI-Focused',
    goal: 'Free Trial Registrations & Demo Bookings',
    ctaText: 'Start Your 14-Day Free Trial',
    visualStyle: 'Modern Tech UI, Holographic 3D Graphs, Neon Indigo Glow',
    sampleCampaign: {
      campaignTitle: 'FlowPilot: Autonomous CRM & Workflow Agent',
      theme: 'Reclaim 15 hours every week from manual data hygiene',
      targetAudienceSummary: 'B2B team leaders overwhelmed by cross-platform data entry between HubSpot, Notion, and Slack.',
      subjectLines: [
        {
          id: 's1',
          subject: 'Stop copying data between your CRM and spreadsheets',
          preheader: 'Meet FlowPilot: 1-click autonomous workflows for fast teams',
          angle: 'Pain Point Agitation',
          predictedOpenRate: '35% - Very High',
          isRecommended: true,
        },
        {
          id: 's2',
          subject: 'How 420+ ops teams automated their weekly syncs',
          preheader: 'See the exact workflows saving 15 hours/week',
          angle: 'Social Proof / Case Study',
          predictedOpenRate: '32% - High',
          isRecommended: false,
        },
        {
          id: 's3',
          subject: 'Your new AI operations teammate just clocked in',
          preheader: 'Zero code required. Connect your tools in 3 minutes.',
          angle: 'Novelty & Ease of Use',
          predictedOpenRate: '29% - High',
          isRecommended: false,
        },
        {
          id: 's4',
          subject: 'FlowPilot is live (Try it free for 14 days)',
          preheader: 'No credit card needed to automate your first 1,000 tasks',
          angle: 'Low Barrier Offer',
          predictedOpenRate: '30% - High',
          isRecommended: false,
        },
      ],
      emailContent: {
        badge: 'PRODUCT UPDATE v3.0',
        headline: 'Automate Repetitive Work in Seconds, Not Sprints',
        subheadline: 'Connect your stack in 3 minutes. Let AI sync leads, draft follow-ups, and clean pipeline data while you sleep.',
        heroImagePrompt: 'Futuristic sleek holographic dashboard floating in clean dark-mode glass space, glowing purple and cyan nodes connecting CRM pipelines, analytics telemetry graphs, 3d render octane render high technology modern enterprise software aesthetic',
        heroImageUrl: '',
        introParagraph: 'Your top performers shouldn\'t be spending their prime hours copy-pasting customer records between spreadsheets and CRMs. FlowPilot watches how you work and automates the tedious connective tissue of your business.',
        bodyParagraph: 'Unlike brittle legacy webhook tools that break when an API changes, FlowPilot utilizes intelligent LLM reasoning to self-heal schema discrepancies and adapt to changing data inputs autonomously.',
        features: [
          {
            icon: 'zap',
            title: 'Instant Multi-App Sync',
            description: 'Native bidirectional sync across Salesforce, HubSpot, Stripe, Notion, and Slack.',
          },
          {
            icon: 'shield',
            title: 'Enterprise SOC2 Type II',
            description: 'End-to-end data encryption with zero data retention used for model training.',
          },
          {
            icon: 'clock',
            title: '3-Minute Setup',
            description: 'Select pre-built recipe templates and deploy your first agent in under 180 seconds.',
          },
        ],
        offerBox: {
          tag: 'LIMITED TIME TRIAL BONUS',
          title: 'Get 5,000 Free Credits on Signup',
          discountCode: 'LAUNCHPILOT',
          details: 'Activate during launch week to receive 5,000 complimentary autonomous task credits.',
          urgencyText: '⚡ Free bonus credits active for the next 72 hours',
        },
        testimonial: {
          quote: 'FlowPilot eliminated 8 hours of weekly manual reporting across our 25-person sales org. It paid for itself on day two.',
          author: 'Elena Rostova',
          role: 'VP of Revenue Operations, CloudScale',
          rating: 5,
        },
        primaryCta: {
          text: 'Start Your 14-Day Free Trial',
          url: 'https://example.com/flowpilot-signup',
        },
        secondaryCta: {
          text: 'Book a 15-Minute Interactive Tour',
          url: 'https://example.com/demo',
        },
        footer: {
          companyName: 'FlowPilot Technologies Inc.',
          address: '500 Howard Street, Suite 800, San Francisco, CA 94105',
          unsubscribeText: 'You received this because you are subscribed to Product Updates. Unsubscribe or update email preferences.',
        },
      },
      deliverability: {
        spamScore: 'Low (99/100 Deliverability Rating)',
        bestSendTime: 'Tuesday 10:00 AM local recipient time',
        keyAdvice: 'B2B emails perform best when plain text fallback is pristine and the secondary CTA links to customer stories.',
      },
    },
  },
  {
    id: 'fitness-wearable',
    name: 'Smart Health Ring Flash Sale',
    category: 'Consumer Hardware / Wellness',
    description: 'Black Friday / Flash sale for biometric sleep & recovery tracker.',
    prompt: 'Flash sale for AuraRing titanium health tracker. $70 off plus free lifetime membership. Focus on sleep tracking, HRV, and discreet titanium finish.',
    audience: 'Health biohackers, athletes, busy executives, wellness seekers',
    tone: 'Inspiring, High-Energy & Urgent',
    goal: 'Direct E-Commerce Sales',
    ctaText: 'Claim Your $70 Off + Lifetime Free',
    visualStyle: 'Sleek dark titanium ring illuminated by dramatic rim lighting, macro focus',
    sampleCampaign: {
      campaignTitle: 'AuraRing: 48-Hour Wellness Flash Sale',
      theme: 'Master your circadian rhythm with medical-grade precision',
      targetAudienceSummary: 'Performance-minded individuals looking for screen-free health insights and actionable recovery metrics.',
      subjectLines: [
        {
          id: 's1',
          subject: 'Your best sleep starts tonight (Save $70 + Lifetime Access)',
          preheader: 'Flash Sale: Medical-grade sleep tracking inside aerospace titanium',
          angle: 'Value & Immediate Benefit',
          predictedOpenRate: '37% - Very High',
          isRecommended: true,
        },
        {
          id: 's2',
          subject: 'Why your smartwatch is ruining your sleep',
          preheader: 'Ditch the glowing screen for seamless titanium biometric insights',
          angle: 'Contrarian Curiosity',
          predictedOpenRate: '33% - Very High',
          isRecommended: false,
        },
        {
          id: 's3',
          subject: '⚡ 48 Hours Only: AuraRing Gen 4 + Zero Subscription Fees',
          preheader: 'Use code SLEEP70 before stock sells out',
          angle: 'Scarcity & Free Perk Hook',
          predictedOpenRate: '34% - High',
          isRecommended: false,
        },
        {
          id: 's4',
          subject: 'Unlock your true HRV recovery score',
          preheader: 'Personalized sleep stages, body temp trends, and readiness score',
          angle: 'Data & Wellness Curiosity',
          predictedOpenRate: '29% - High',
          isRecommended: false,
        },
      ],
      emailContent: {
        badge: '48-HOUR FLASH EVENT',
        headline: 'Biometric Intelligence That Fits on Your Finger',
        subheadline: 'Track Sleep, HRV, and Daily Readiness without screen distraction or bulky watch straps.',
        heroImagePrompt: 'Macro studio photograph of a brushed matte black titanium smart ring sitting on a wet dark slate stone, subtle neon green and warm gold biometric sensor glow emitting from the inner ring circumference, dramatic dark moody rim lighting, sharp focus, 8k resolution luxury jewelry advertising',
        heroImageUrl: '',
        introParagraph: 'Waking up tired even after 8 hours in bed? The problem isn\'t your sleep duration—it\'s your sleep architecture. AuraRing tracks micro-fluctuations in heart rate variability, skin temperature, and blood oxygen to tell you exactly how to optimize your day.',
        bodyParagraph: 'Crafted from aerospace-grade Grade 5 titanium, AuraRing weighs under 4 grams and is waterproof to 100 meters. With a 7-day battery life on a single 30-minute wireless charge, you will forget you are even wearing it.',
        features: [
          {
            icon: 'spark',
            title: 'Circadian Stage Tracking',
            description: 'Accurately distinguishes Deep, REM, and Light sleep stages with 99.4% clinical correlation.',
          },
          {
            icon: 'clock',
            title: '7-Day Battery Life',
            description: 'One quick magnetic charge on Sunday powers your biometric tracking all week long.',
          },
          {
            icon: 'shield',
            title: 'Grade 5 Titanium Armor',
            description: 'Scratch-resistant Diamond-Like Carbon (DLC) coating designed for everyday gym and life.',
          },
        ],
        offerBox: {
          tag: 'LIMITED 48-HOUR PERK',
          title: '$70 Off + Free Lifetime App Access',
          discountCode: 'AURASLEEP70',
          details: 'Save $70 on the ring + waive the standard $9.99/mo app subscription forever. Free ring sizing kit shipped immediately.',
          urgencyText: '⚡ Sale ends Sunday at midnight or while allocation lasts',
        },
        testimonial: {
          quote: 'The readiness score completely changed when and how hard I train. And ditching a bulky glowing watch at night made my deep sleep jump 40%.',
          author: 'David Chen',
          role: 'Ironman Finisher & Tech Executive',
          rating: 5,
        },
        primaryCta: {
          text: 'Claim Your $70 Off + Lifetime Free',
          url: 'https://example.com/auraring-flash',
        },
        secondaryCta: {
          text: 'Order Free Sizing Kit First',
          url: 'https://example.com/sizing-kit',
        },
        footer: {
          companyName: 'AuraRing Health Inc.',
          address: '88 King Street, San Francisco, CA 94107',
          unsubscribeText: 'You received this notification because you subscribed to wellness alerts. Unsubscribe.',
        },
      },
      deliverability: {
        spamScore: 'Low (96/100 Deliverability Rating)',
        bestSendTime: 'Friday 7:00 PM (Weekend browsing & health intent peak)',
        keyAdvice: 'Ensure the discount code is clearly styled with a copy-to-clipboard button so mobile buyers don\'t abandon.',
      },
    },
  },
];
