import { CampaignData } from '../types/campaign';

export function generatePlainTextEmail(campaign: CampaignData): string {
  const { emailContent, subjectLines, activeSubjectLineIndex = 0 } = campaign;
  const currentSubject = subjectLines[activeSubjectLineIndex] || subjectLines[0];

  const featuresText = emailContent.features
    .map((f, i) => `${i + 1}. ${f.title}\n   ${f.description}`)
    .join('\n\n');

  return `SUBJECT: ${currentSubject ? currentSubject.subject : campaign.campaignTitle}
PREHEADER: ${currentSubject ? currentSubject.preheader : ''}

------------------------------------------------------------
${emailContent.footer.companyName.toUpperCase()}
[${emailContent.badge}]
------------------------------------------------------------

${emailContent.headline}
${emailContent.subheadline}

${emailContent.introParagraph}

${emailContent.bodyParagraph}

KEY HIGHLIGHTS:
${featuresText}

------------------------------------------------------------
${emailContent.offerBox.tag}: ${emailContent.offerBox.title}
Use Code: ${emailContent.offerBox.discountCode}
${emailContent.offerBox.details}
(${emailContent.offerBox.urgencyText})
------------------------------------------------------------

>>> ${emailContent.primaryCta.text}
${emailContent.primaryCta.url}

Or learn more: ${emailContent.secondaryCta.text} (${emailContent.secondaryCta.url})

WHAT OUR CUSTOMERS SAY:
"${emailContent.testimonial.quote}"
- ${emailContent.testimonial.author}, ${emailContent.testimonial.role}

------------------------------------------------------------
${emailContent.footer.companyName}
${emailContent.footer.address}
${emailContent.footer.unsubscribeText}
`;
}
