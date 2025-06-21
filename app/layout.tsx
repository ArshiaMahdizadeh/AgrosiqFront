import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agrosiq - Smart and Reliable Agricultural Exports',
  description: 'Advanced agricultural exports platform with forecasting, traceability, and authenticity verification.',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
  ],
  themeColor: '#00796B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}