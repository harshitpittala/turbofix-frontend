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
      // page yet, so /repairs/nothing (now /brands/nothing) stays live.
      { source: '/repairs/apple', destination: '/iphone-service-hyderabad', permanent: true },
      { source: '/repairs/samsung', destination: '/samsung-service-hyderabad', permanent: true },
      { source: '/repairs/oneplus', destination: '/oneplus-service-hyderabad', permanent: true },
      { source: '/repairs/xiaomi', destination: '/xiaomi-service-hyderabad', permanent: true },
      { source: '/repairs/vivo', destination: '/vivo-service-hyderabad', permanent: true },
      { source: '/repairs/oppo', destination: '/oppo-service-hyderabad', permanent: true },
      { source: '/repairs/realme', destination: '/realme-service-hyderabad', permanent: true },
      { source: '/repairs/motorola', destination: '/motorola-service-hyderabad', permanent: true },
      { source: '/repairs/google-pixel', destination: '/google-pixel-service-hyderabad', permanent: true },

      // /repairs and /book-repair renamed to /brands and /book-a-visit —
      // the word "repair" in these URLs was contributing to Third-Party
      // Consumer Technical Support policy disapprovals. These catch-alls
      // must stay AFTER the specific /repairs/:brand redirects above so
      // brand-specific traffic still lands on the dedicated city pages.
      { source: '/repairs/:brand', destination: '/brands/:brand', permanent: true },
      { source: '/repairs', destination: '/brands', permanent: true },
      { source: '/book-repair/success', destination: '/book-a-visit/success', permanent: true },
      { source: '/book-repair', destination: '/book-a-visit', permanent: true },

      // Renamed to drop "repair" from the URL — these pages were used as
      // Google Ads sitelink destinations and the literal word "repair" in
      // the slug was contributing to Third-Party Consumer Technical Support
      // policy disapprovals. Old URLs 301 to the new slugs.
      { source: '/iphone-repair-hyderabad', destination: '/iphone-service-hyderabad', permanent: true },
      { source: '/samsung-repair-hyderabad', destination: '/samsung-service-hyderabad', permanent: true },
      { source: '/water-damage-repair-hyderabad', destination: '/water-damage-hyderabad', permanent: true },
      { source: '/oneplus-repair-hyderabad', destination: '/oneplus-service-hyderabad', permanent: true },
      { source: '/realme-repair-hyderabad', destination: '/realme-service-hyderabad', permanent: true },
      { source: '/oppo-repair-hyderabad', destination: '/oppo-service-hyderabad', permanent: true },
      { source: '/vivo-repair-hyderabad', destination: '/vivo-service-hyderabad', permanent: true },
      { source: '/xiaomi-repair-hyderabad', destination: '/xiaomi-service-hyderabad', permanent: true },
      { source: '/google-pixel-repair-hyderabad', destination: '/google-pixel-service-hyderabad', permanent: true },
      { source: '/motorola-repair-hyderabad', destination: '/motorola-service-hyderabad', permanent: true },
      { source: '/charging-port-repair-hyderabad', destination: '/charging-port-service-hyderabad', permanent: true },
      { source: '/speaker-repair-hyderabad', destination: '/speaker-service-hyderabad', permanent: true },
      { source: '/camera-repair-hyderabad', destination: '/camera-service-hyderabad', permanent: true },
      { source: '/motherboard-repair-hyderabad', destination: '/motherboard-service-hyderabad', permanent: true },

      // Blog post slugs renamed to drop "repair"/"recovery"/"fix" trigger
      // language from the URL for Google Ads policy compliance.
      { source: '/blog/water-damage-phone-recovery', destination: '/blog/water-damage-phone-service', permanent: true },
      { source: '/blog/samsung-galaxy-screen-repair', destination: '/blog/samsung-galaxy-screen-service', permanent: true },
      { source: '/blog/phone-overheating-fix', destination: '/blog/phone-overheating-causes', permanent: true },
      { source: '/blog/charging-port-repair-guide', destination: '/blog/charging-port-service-guide', permanent: true },
      { source: '/blog/android-vs-iphone-repair', destination: '/blog/android-vs-iphone-service', permanent: true },
      { source: '/blog/oneplus-common-problems-fixes', destination: '/blog/oneplus-common-problems-solutions', permanent: true },
      { source: '/blog/smartphone-data-recovery-guide', destination: '/blog/smartphone-data-loss-guide', permanent: true },
      { source: '/blog/phone-motherboard-repair-guide', destination: '/blog/phone-motherboard-service-guide', permanent: true },
      { source: '/blog/google-pixel-repair-guide', destination: '/blog/google-pixel-service-guide', permanent: true },
      { source: '/blog/realme-phone-repair-guide', destination: '/blog/realme-phone-service-guide', permanent: true },
      { source: '/blog/how-doorstep-mobile-repair-works', destination: '/blog/how-doorstep-mobile-service-works', permanent: true },
      { source: '/blog/choosing-mobile-repair-service-hyderabad', destination: '/blog/choosing-mobile-service-hyderabad', permanent: true },
    ];
  },
};

export default nextConfig;
