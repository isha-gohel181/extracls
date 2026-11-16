import fs from 'fs';
import path from 'path';
import { APP_DISPLAY_NAME, APP_TAGLINE, CERTIFICATE_ORGANIZATION_DEFAULT } from './appBrand.js';

/** Legacy path — prefer EXTRACLS HTML fallback when Pearls artwork is present */
export const PEARLS_CERTIFICATE_BG_REL = 'assets/certificates/certificate.png';

const USE_BRANDED_HTML_FALLBACK =
  process.env.CERTIFICATE_USE_HTML_FALLBACK !== 'false';

export function getPearlsCertificateBgPath() {
  return path.join(process.cwd(), PEARLS_CERTIFICATE_BG_REL);
}

function getExtraclsCertificateFallbackHtml() {
  const org = CERTIFICATE_ORGANIZATION_DEFAULT || APP_DISPLAY_NAME;
  return `<div style="position:absolute;inset:0;background:#F0F7FF;border:6px solid #142B5C;z-index:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:48px 32px;box-sizing:border-box;font-family:Georgia,serif;">
    <div style="text-align:center;color:#142B5C;">
      <div style="font-size:32px;font-weight:bold;letter-spacing:3px;margin-bottom:8px;">${org}</div>
      <div style="font-size:14px;color:#334155;margin-bottom:32px;">${APP_TAGLINE}</div>
      <div style="font-size:22px;font-weight:bold;color:#263B63;margin-top:24px;">Certificate of Completion</div>
    </div>
  </div>`;
}

export function getPearlsCertificateBackgroundHtml() {
  if (USE_BRANDED_HTML_FALLBACK) {
    return getExtraclsCertificateFallbackHtml();
  }
  const bgPath = getPearlsCertificateBgPath();
  if (fs.existsSync(bgPath)) {
    const bgPathUrl = bgPath.replace(/\\/g, '/');
    return `<img src="file://${bgPathUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0;" alt="Certificate" />`;
  }
  return getExtraclsCertificateFallbackHtml();
}

/** All dynamic overlays off — artwork or fallback is shown as-is. */
export const DEFAULT_PEARLS_TEMPLATE_ELEMENTS = {
  student_name: { enable: false, content: '[student_name]', position_x: 0, position_y: 0 },
  user_certificate_additional: { enable: false, content: '[user_certificate_additional]', position_x: 0, position_y: 0 },
  date: { enable: false, content: '[date]', position_x: 0, position_y: 0, display_date: 'textual' },
  hint: { enable: false, content: '[serial_number]', position_x: 0, position_y: 0 },
  instructor_name: { enable: false, content: '[instructor_name]', position_x: 0, position_y: 0 },
  body: { enable: false, content: '', position_x: 0, position_y: 0 },
  platform_name: { enable: false, content: '', position_x: 0, position_y: 0 },
  title: { enable: false, content: '', position_x: 0, position_y: 0 },
  subtitle: { enable: false, content: '', position_x: 0, position_y: 0 },
  qr_code: { enable: false, content: '[qr_code]', position_x: 0, position_y: 0 },
  platform_signature: { enable: false, content: '[platform_signature]', position_x: 0, position_y: 0 },
  stamp: { enable: false, content: '[stamp]', position_x: 0, position_y: 0 },
};

export function getDefaultPearlsTemplatePayload(createdById) {
  return {
    locale: 'EN',
    title: `${APP_DISPLAY_NAME} — Course Completion`,
    image: PEARLS_CERTIFICATE_BG_REL.replace(/\\/g, '/'),
    type: 'course',
    status: 'publish',
    template_contents: '<div class="certificate-template-container"></div>',
    elements: DEFAULT_PEARLS_TEMPLATE_ELEMENTS,
    created_by: createdById,
  };
}

export { APP_DISPLAY_NAME, APP_TAGLINE, CERTIFICATE_ORGANIZATION_DEFAULT };