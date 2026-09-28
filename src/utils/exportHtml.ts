import { CampaignData } from '../types/campaign';

export function generateResponsiveEmailHtml(campaign: CampaignData): string {
  const { emailContent, subjectLines, activeSubjectLineIndex = 0 } = campaign;
  const currentSubject = subjectLines[activeSubjectLineIndex] || subjectLines[0];

  const heroImageHtml = emailContent.heroImageUrl
    ? `<tr>
        <td align="center" style="padding: 0 0 24px 0;">
          <img src="${emailContent.heroImageUrl}" alt="${emailContent.headline}" width="560" style="display: block; width: 100%; max-width: 560px; height: auto; border-radius: 12px; border: 0;" />
        </td>
      </tr>`
    : '';

  const featuresHtml = emailContent.features
    .map(
      (feat) => `<tr>
        <td style="padding: 12px 16px; background-color: #f8fafc; border-radius: 8px; margin-bottom: 8px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="vertical-align: top; width: 28px; padding-top: 2px;">
                <span style="display: inline-block; width: 20px; height: 20px; background-color: #6366f1; border-radius: 50%; color: #ffffff; text-align: center; line-height: 20px; font-size: 11px;">✓</span>
              </td>
              <td>
                <h4 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #0f172a; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${feat.title}</h4>
                <p style="margin: 0; font-size: 14px; line-height: 20px; color: #475569; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${feat.description}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td height="8" style="font-size: 8px; line-height: 8px;">&nbsp;</td></tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${currentSubject ? currentSubject.subject : campaign.campaignTitle}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f1f5f9; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
      .mobile-padding { padding: 20px 16px !important; }
      .mobile-headline { font-size: 26px !important; line-height: 32px !important; }
      .mobile-btn { display: block !important; width: 100% !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <!-- Preview Text / Preheader -->
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${currentSubject ? currentSubject.preheader : ''}
    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Email Container (600px) -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06); max-width: 600px; width: 100%;">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 24px 32px 16px 32px; border-bottom: 1px solid #f1f5f9; text-align: center;">
              <span style="display: inline-block; font-size: 18px; font-weight: 800; letter-spacing: -0.5px; color: #0f172a; text-transform: uppercase;">
                ${emailContent.footer.companyName}
              </span>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td class="mobile-padding" style="padding: 32px 32px 24px 32px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                
                <!-- Badge -->
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <span style="display: inline-block; background-color: #ede9fe; color: #6366f1; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase;">
                      ${emailContent.badge}
                    </span>
                  </td>
                </tr>

                <!-- Headline -->
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <h1 class="mobile-headline" style="margin: 0; font-size: 30px; font-weight: 800; line-height: 38px; color: #0f172a; letter-spacing: -0.5px; text-align: center;">
                      ${emailContent.headline}
                    </h1>
                  </td>
                </tr>

                <!-- Subheadline -->
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <p style="margin: 0; font-size: 16px; line-height: 24px; color: #64748b; text-align: center; max-width: 500px;">
                      ${emailContent.subheadline}
                    </p>
                  </td>
                </tr>

                <!-- Hero Image -->
                ${heroImageHtml}

                <!-- Intro Hook -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0; font-size: 16px; line-height: 26px; color: #334155;">
                      ${emailContent.introParagraph}
                    </p>
                  </td>
                </tr>

                <!-- Body Narrative -->
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0; font-size: 15px; line-height: 25px; color: #475569;">
                      ${emailContent.bodyParagraph}
                    </p>
                  </td>
                </tr>

                <!-- Key Features List -->
                ${featuresHtml}

                <!-- Special Offer Box -->
                <tr>
                  <td style="padding: 24px 0;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%); border: 1.5px dashed #818cf8; border-radius: 12px; text-align: center; padding: 20px;">
                      <tr>
                        <td>
                          <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #4f46e5; text-transform: uppercase;">
                            ${emailContent.offerBox.tag}
                          </span>
                          <h3 style="margin: 8px 0 6px 0; font-size: 20px; font-weight: 800; color: #0f172a;">
                            ${emailContent.offerBox.title}
                          </h3>
                          <p style="margin: 0 0 14px 0; font-size: 14px; color: #475569;">
                            ${emailContent.offerBox.details}
                          </p>
                          <div style="display: inline-block; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 18px; font-family: monospace; font-size: 18px; font-weight: 700; color: #4338ca; letter-spacing: 2px;">
                            ${emailContent.offerBox.discountCode}
                          </div>
                          <p style="margin: 10px 0 0 0; font-size: 12px; color: #dc2626; font-weight: 600;">
                            ${emailContent.offerBox.urgencyText}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Primary CTA -->
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="border-radius: 8px; background-color: #4f46e5;">
                          <a href="${emailContent.primaryCta.url}" target="_blank" class="mobile-btn" style="display: inline-block; padding: 16px 36px; font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px; background-color: #4f46e5; text-align: center;">
                            ${emailContent.primaryCta.text} &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Secondary Link -->
                <tr>
                  <td align="center" style="padding-bottom: 28px;">
                    <a href="${emailContent.secondaryCta.url}" target="_blank" style="font-size: 14px; font-weight: 600; color: #6366f1; text-decoration: underline;">
                      ${emailContent.secondaryCta.text}
                    </a>
                  </td>
                </tr>

                <!-- Testimonial Quote -->
                <tr>
                  <td style="padding: 20px; background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 4px 8px 8px 4px;">
                    <p style="margin: 0 0 8px 0; font-style: italic; font-size: 14px; line-height: 22px; color: #334155;">
                      "${emailContent.testimonial.quote}"
                    </p>
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0f172a;">
                      ${emailContent.testimonial.author} <span style="font-weight: 400; color: #64748b;">— ${emailContent.testimonial.role}</span>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b;">
                ${emailContent.footer.companyName} &bull; ${emailContent.footer.address}
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 16px;">
                ${emailContent.footer.unsubscribeText}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
