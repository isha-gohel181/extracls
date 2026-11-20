/** Product branding — keep in sync with backend utils/appBrand.js */
export const APP_DISPLAY_NAME = "EXTRACLS";
export const APP_SHORT_NAME = "EXTRACLS";
export const APP_TAGLINE = "Extra for Excellence.";
export const CERTIFICATE_ORGANIZATION_DEFAULT = "EXTRACLS";
/** Default admin/site logo (sidebar, auth). Web navbar uses NAV_LOGO_PATH in web brand.js only. */
export const LOGO_PATH = "/Extra_cls/logo/logo.png";
export const LOGO_COMPACT_PATH = "/Extra_cls/logo/logo.png";
export const CERTIFICATE_DEFAULT_IMAGE = "/Extra_cls/logo/logo.png";

/**
 * Landing / web theme (web/src/index.css + Footer.jsx):
 * accent #55B8F5, navy #142B5C, light sky #F0F7FF
 */
export const BRAND_ACCENT_HEX = "#55B8F5";
export const BRAND_BROWN_HEX = "#142B5C";
export const BRAND_CREAM_HEX = "#F0F7FF";

/** Dark blue theme matching bottom of sidebar / landing footer (#142B5C) */
export const BRAND_LANDING_GRADIENT_CLASS =
  "bg-gradient-to-b from-brand-800 to-brand-900";

export const BRAND_SIDEBAR_CLASS = "bg-brand-800";
export const BRAND_ACCENT_CLASS = BRAND_SIDEBAR_CLASS;

export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || "services.extracls@gmail.com";

export function getSupportEmailDisplay(): string {
  return SUPPORT_EMAIL || "services.extracls@gmail.com";
}