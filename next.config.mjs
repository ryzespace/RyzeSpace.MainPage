// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

// <— wskazuje na Twój plik z listą języków
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

// eksportujesz konfigurację owiniętą w plugin
export default withNextIntl(nextConfig);