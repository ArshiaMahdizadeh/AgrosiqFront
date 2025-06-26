'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mobile viewport height fix
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        window.innerHeight * 0.01 + 'px'
      );
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {/* Mobile viewport fix */}
        <div className="fixed top-0 left-0 right-0 h-1 w-full bg-transparent z-[9999] pointer-events-none" />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
