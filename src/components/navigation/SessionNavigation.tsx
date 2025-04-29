"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface SessionNavigationProps {
  onViewChange: (view: "chat" | "history") => void;
  currentView: "chat" | "history";
}

export const SessionNavigation: React.FC<SessionNavigationProps> = ({ onViewChange, currentView }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
      if (!ctrlOrCmd) return;
      if (e.key === '1') {
        e.preventDefault();
        onViewChange('chat');
      } else if (e.key === '2') {
        e.preventDefault();
        onViewChange('history');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onViewChange]);

  return (
    <div
      className="flex justify-center gap-2 md:gap-4 p-2 border-b border-gray-300 dark:border-gray-700"
      role="tablist"
      aria-label="Session navigation"
    >
      <Button
        role="tab"
        aria-selected={currentView === "chat"}
        variant={currentView === "chat" ? "default" : "outline"}
        onClick={() => onViewChange("chat")}
        aria-current={currentView === "chat" ? "page" : undefined}
        className="focus-visible:ring-2 focus-visible:ring-offset-2 min-w-[44px] min-h-[44px]"
      >
        Active Chat
      </Button>
      <Button
        role="tab"
        aria-selected={currentView === "history"}
        variant={currentView === "history" ? "default" : "outline"}
        onClick={() => onViewChange("history")}
        aria-current={currentView === "history" ? "page" : undefined}
        className="focus-visible:ring-2 focus-visible:ring-offset-2 min-w-[44px] min-h-[44px]"
      >
        History
      </Button>
    </div>
  );
};

export default SessionNavigation;
