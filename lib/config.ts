/**
 * config.ts — Centralized API & site configuration
 *
 * NEXT_PUBLIC_API_URL is baked in at `npm run build` time by webpack.
 * For local dev, create .env.local with:
 *   NEXT_PUBLIC_API_URL=http://localhost:5000
 * Leave unset when building for Netlify — falls back to the Render URL.
 */

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://turbofix-backend-aqhy.onrender.com';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://turbofix.in';

export const WHATSAPP_NUMBER = '918639605147';
export const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}`;

export const CONTACT_EMAIL = 'support@turbofix.in';
export const CONTACT_PHONE = '+91 86396 05147';
export const CONTACT_PHONE_E164 = '+918639605147';

// ── Business identity (NAP) ────────────────────────────────────────────────
// Single source for the name / address / phone shown in the footer, contact
// page and LocalBusiness schema. Keep it identical to the Google Business
// Profile and directory listings, character for character.
export const BUSINESS_NAME = 'TurboFix';
export const BUSINESS_ADDRESS = {
  street: 'Bharat Nagar, Aghapura, Nampally',
  locality: 'Hyderabad',
  region: 'Telangana',
  postalCode: '500001',
  country: 'IN',
} as const;
export const BUSINESS_ADDRESS_LINE =
  `${BUSINESS_ADDRESS.street}, ${BUSINESS_ADDRESS.locality}, ${BUSINESS_ADDRESS.region} ${BUSINESS_ADDRESS.postalCode}`;

// Google Business Profile share link, supplied by the owner (4 Oct 2026).
// It resolves to Google's entity for TurboFix (Knowledge Graph ID /g/11npd6rz_4).
// Linked from the footer, contact and testimonials pages and in schema sameAs.
export const GOOGLE_BUSINESS_PROFILE_URL: string = 'https://share.google/6TH4yxPGekq2wfb9a';

// Only profiles confirmed to belong to TurboFix. Instagram confirmed by the
// owner (4 Oct 2026). facebook.com/turbofix (an unrelated person) and
// youtube.com/@turbofix (an unrelated channel) are NOT TurboFix's.
// Add real Facebook / YouTube / X pages here once they exist.
export const SOCIAL_PROFILES = [
  { label: 'Instagram', href: 'https://www.instagram.com/turbofix.in' },
] as const;
