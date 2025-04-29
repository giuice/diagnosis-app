"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";
import { useEffect, useState, useRef } from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import { useChatStore } from '@/store/useChatStore';
import HistoryView from '@/components/history/HistoryView';
import SessionViewer from '@/components/history/SessionViewer';
import SessionNavigation from '@/components/navigation/SessionNavigation';
import NewDiagnosisButton from '@/components/session/NewDiagnosisButton';
import ExportButton from '@/components/session/ExportButton';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const createNewSession = useSessionStore((state) => state.createNewSession);
  const messages = useChatStore((state) => state.messages);

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

  const handleNewDiagnosis = () => {
    if (!messages || messages.length === 0) {
      alert('Cannot start a new diagnosis without any messages.');
      return;
    }
    const title = `Diagnosis ${new Date().toLocaleString()}`;
    const newSessionId = createNewSession(title, messages);
    if (!newSessionId) {
      console.log('No new session created because message list was empty.');
      return;
    }
    handleViewChange('chat');
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
              <NewDiagnosisButton variant="outline" />
              <ExportButton variant="outline" />
            </nav>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setIsDark(!isDark)}
              className="flex items-center gap-2"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? 'Light' : 'Dark'} Mode
            </Button>
          </aside>

          {/* Mobile top nav */}
          <header className="flex md:hidden flex-col gap-2 p-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="font-semibold">Diagnosis App</h1>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsDark(!isDark)}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Mobile navigation tabs */}
            <SessionNavigation
              currentView={viewMode === 'viewer' ? 'history' : viewMode}
              onViewChange={(view) => {
                handleViewChange(view);
                setMobileMenuOpen(false);
              }}
            />
            
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="flex flex-col gap-2 mt-2 p-2 bg-background border border-border rounded-md shadow-lg">
                <NewDiagnosisButton size="sm" />
                <ExportButton size="sm" />
              </div>
            )}
          </header>

          {/* Main content */}
          <main
            ref={mainRef}
            tabIndex={-1}
            className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto outline-none"
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
                  {/* Consistent breadcrumb navigation */}
                  <Breadcrumbs 
                    currentView={viewMode}
                    onNavigate={handleViewChange}
                  />
                  
                  {viewMode === 'history' && <HistoryView onSelectSession={() => setViewMode('viewer')} />}
                  {viewMode === 'viewer' && <SessionViewer onViewChange={handleViewChange} />}
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
