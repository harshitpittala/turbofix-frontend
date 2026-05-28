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
