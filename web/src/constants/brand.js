/** Product branding — keep in sync with backend utils/appBrand.js and admin constants/brand.ts */

export const APP_DISPLAY_NAME = 'EXTRACLS';
export const APP_SHORT_NAME = 'EXTRACLS';
export const APP_TAGLINE = 'Extra for Excellence.';
export const CERTIFICATE_ORGANIZATION_DEFAULT = 'EXTRACLS';
/** Default site logo (footer, auth, dashboard, etc.). Navbar uses NAV_LOGO_PATH only. */
export const LOGO_PATH = '/Extra_cls/logo/logo.png';
export const LOGO_COMPACT_PATH = '/Extra_cls/logo/logo.png';
export const NAV_LOGO_PATH = '/Extra_cls/logo/nav_logo.jpeg';
export const MENTOR_IMAGE_PATH = '/Extra_cls/landing/training-guidance.jpg';
/** Default course certificate artwork (full design — overlays add name, course, date, serial) */
export const CERTIFICATE_DEFAULT_IMAGE = '/Extra_cls/logo/logo.png';

export const PLAY_STORE_URL = (import.meta.env.VITE_PLAY_STORE_URL || '').trim();
export const APP_STORE_URL = (import.meta.env.VITE_APP_STORE_URL || '').trim();

export const MENTOR_NAME = 'Our Educators';
export const MENTOR_TITLE = 'Experienced Educators & Subject Experts';
export const MENTOR_CREDENTIALS = [
  'Engaging lessons for young learners',
  'High-quality study materials',
  'Curiosity, creativity, and discovery',
];
export const MENTOR_STORY = [
  'Programs at EXTRACLS are designed by experienced educators to make learning simple, interesting, and effective.',
  'From building strong foundations to exploring new ideas, we support every child’s learning journey with care and quality.',
];

export const DEFAULT_SUPPORT_EMAIL = 'services.extracls@gmail.com';

const LEGACY_SUPPORT_EMAILS = new Set([
  '32pearlsdentalacademy@gmail.com',
  '32pearlsdental@gmail.com',
]);

export const SUPPORT_EMAIL = (() => {
  const fromEnv = (import.meta.env.VITE_SUPPORT_EMAIL || '').trim().toLowerCase();
  if (fromEnv && !LEGACY_SUPPORT_EMAILS.has(fromEnv)) {
    return import.meta.env.VITE_SUPPORT_EMAIL.trim();
  }
  return DEFAULT_SUPPORT_EMAIL;
})();

/** E.164 without + for wa.me / tel */
export const SUPPORT_PHONE_E164 = '917602501527';
export const SUPPORT_PHONE_TEL = `+${SUPPORT_PHONE_E164}`;
export const WHATSAPP_URL = `https://wa.me/${SUPPORT_PHONE_E164}`;

export const ABOUT_US_PARAGRAPH =
  'Welcome to Extracls, where little minds grow and learning becomes joyful! We offer engaging educational courses and high-quality study materials for preschool and primary school children. Designed by experienced educators and subject experts, our resources make learning simple, interesting, and effective. Beyond the school curriculum, we encourage curiosity, creativity, and a love for discovery. From building strong foundations to exploring new ideas, Extracls supports every child’s learning journey with care and quality.';

export const ABOUT_US_FOOTER_EXCERPT =
  'Engaging educational courses and quality study materials for preschool and primary school children—Extra for Excellence.';

export const MISSION_STATEMENT = 'To help every learner go the EXTRA mile.';

export function getSupportEmailDisplay() {
  return SUPPORT_EMAIL || DEFAULT_SUPPORT_EMAIL;
}

export function getSupportPhoneDisplay() {
  return '7602501527';
}