import { LANDING_IMAGES } from '../constants/landingImages';

/** Reset broken <img> src to bundled fallback (once per element). */
export function handleLandingImageError(event) {
  const img = event.currentTarget;
  if (!img || img.dataset.fallbackApplied === '1') return;
  img.dataset.fallbackApplied = '1';
  img.src = LANDING_IMAGES.fallback;
}