"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import HistoryView from '@/components/history/HistoryView';
import SessionViewer from '@/components/history/SessionViewer';
import SessionNavigation from '@/components/navigation/SessionNavigation';
import { AnimatePresence, motion } from 'framer-motion';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setIsDark] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'history' | 'viewer'>('chat');
  const [loading, setLoading] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const createNewSession = useSessionStore((state) => state.createNewSession);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleViewChange = (view: 'chat' | 'history') => {
    setLoading(true);
    setTimeout(() => {
      setViewMode(view);
      setLoading(false);
      mainRef.current?.focus();
    }, 150); // simulate brief loading
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-4">
            <h1 className="text-lg font-semibold mb-6">Diagnosis App</h1>
            <SessionNavigation
              currentView={viewMode === 'viewer' ? 'history' : viewMode}
              onViewChange={handleViewChange}
            />
            <nav className="flex flex-col gap-4 mb-4 mt-4">
              <Button variant="outline" onClick={() => { createNewSession(); handleViewChange('chat'); }}>New Diagnosis</Button>
              <Button variant="outline">Export</Button>
            </nav>
            <Button size="sm" onClick={() => setIsDark(!isDark)}>
              Toggle {isDark ? 'Light' : 'Dark'} Mode
            </Button>
          </aside>

          {/* Mobile top nav */}
          <header className="flex md:hidden flex-col gap-2 p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Diagnosis App</h1>
              <Button size="sm" onClick={() => setIsDark(!isDark)}>
                {isDark ? 'Light' : 'Dark'}
              </Button>
            </div>
            <SessionNavigation
              currentView={viewMode === 'viewer' ? 'history' : viewMode}
              onViewChange={handleViewChange}
            />
            <div className="flex gap-3 mt-2">
              <Button size="sm" variant="outline" onClick={() => { createNewSession(); handleViewChange('chat'); }}>New</Button>
              <Button size="sm" variant="outline">Export</Button>
            </div>
          </header>

          {/* Main content */}
          <main
            ref={mainRef}
            tabIndex={-1}
            className="flex-1 p-4 overflow-y-auto outline-none"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-full"
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </motion.div>
              ) : (
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {viewMode === 'viewer' && (
                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={() => handleViewChange('history')}
                        className="text-blue-600 hover:underline"
                      >
                        ← Back to History
                      </button>
                      <span className="text-gray-500">/</span>
                      <span className="font-semibold">Session Viewer</span>
                    </div>
                  )}
                  {viewMode === 'history' && <HistoryView onSelectSession={() => setViewMode('viewer')} />}
                  {viewMode === 'viewer' && <SessionViewer />}
                  {viewMode === 'chat' && children}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </body>
    </html>
  );
}
