import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agrosiq - Smart and Reliable Agricultural Exports',
  description: 'Advanced agricultural exports platform with forecasting, traceability, and authenticity verification.',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
  ],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};