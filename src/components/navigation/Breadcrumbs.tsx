'use client'
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useSessionStore } from '@/store/useSessionStore';

interface BreadcrumbsProps {
  currentView: 'chat' | 'history' | 'viewer';
  onNavigate?: (view: 'chat' | 'history') => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentView, onNavigate }) => {
  const currentSession = useSessionStore((s) => s.currentSession);
  
  const handleNavigate = (view: 'chat' | 'history') => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1">
        <li>
          <button
            onClick={() => handleNavigate('chat')}
            className={`hover:text-foreground transition-colors ${
              currentView === 'chat' ? 'font-medium text-foreground' : ''
            }`}
          >
            Home
          </button>
        </li>
        
        {currentView !== 'chat' && (
          <>
            <ChevronRight className="h-3 w-3" />
            <li>
              <button
                onClick={() => handleNavigate('history')}
                className={`hover:text-foreground transition-colors ${
                  currentView === 'history' ? 'font-medium text-foreground' : ''
                }`}
              >
                History
              </button>
            </li>
          </>
        )}

        {currentView === 'viewer' && (
          <>
            <ChevronRight className="h-3 w-3" />
            <li className="font-medium text-foreground">
              {currentSession?.meta.title || 'Session Viewer'}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
