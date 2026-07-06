/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'turbofix.in' },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  // Expose env vars to the browser (NEXT_PUBLIC_ prefix required)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://turbofix-backend-aqhy.onrender.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://turbofix.in',
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' is required for the inline gtag bootstrap script in app/layout.tsx;
      // 'unsafe-eval' is required by Next.js dev/HMR and some Google tag scripts.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self' https://turbofix-backend-aqhy.onrender.com https://www.google.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.google-analytics.com https://ad.doubleclick.net https://stats.g.doubleclick.net",
      "frame-src https://www.google.com https://maps.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join('; ');

    const securityHeaders = [
      { key: 'Content-Security-Policy', value: csp },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    ];

    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      // /hyderabad/[area] duplicated /locations/[area] for the same local-SEO
      // intent — consolidate all link equity onto /locations.
      { source: '/hyderabad', destination: '/locations', permanent: true },
      { source: '/hyderabad/:area', destination: '/locations/:area', permanent: true },

      // /terms-conditions duplicated /terms verbatim.
      { source: '/terms-conditions', destination: '/terms', permanent: true },

      // /repairs/[brand] duplicated the hyper-local /[brand]-repair-hyderabad
      // pages for every brand that has one. "nothing" has no dedicated city
      // page yet, so /repairs/nothing stays live.
      { source: '/repairs/apple', destination: '/iphone-repair-hyderabad', permanent: true },
      { source: '/repairs/samsung', destination: '/samsung-repair-hyderabad', permanent: true },
      { source: '/repairs/oneplus', destination: '/oneplus-repair-hyderabad', permanent: true },
      { source: '/repairs/xiaomi', destination: '/xiaomi-repair-hyderabad', permanent: true },
      { source: '/repairs/vivo', destination: '/vivo-repair-hyderabad', permanent: true },
      { source: '/repairs/oppo', destination: '/oppo-repair-hyderabad', permanent: true },
      { source: '/repairs/realme', destination: '/realme-repair-hyderabad', permanent: true },
      { source: '/repairs/motorola', destination: '/motorola-repair-hyderabad', permanent: true },
      { source: '/repairs/google-pixel', destination: '/google-pixel-repair-hyderabad', permanent: true },
    ];
  },
};

export default nextConfig;
