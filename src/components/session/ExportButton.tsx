'use client'
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";
import { useSessionStore } from "@/store/useSessionStore";
import { useChatStore } from "@/store/useChatStore";
import { exportSessionToPDF } from "@/lib/utils/pdfExport";

interface ExportButtonProps {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  variant = "outline",
  size = "default",
  className = ""
}) => {
  const currentSession = useSessionStore((s) => s.currentSession);
  const messages = useChatStore((s) => s.messages);

  const handleExport = () => {
    if (!currentSession) {
      alert('No active session to export.');
      return;
    }

    // Make sure we have the most current messages
    const sessionToExport = {
      ...currentSession,
      messages: messages.length > 0 ? messages : currentSession.messages
    };

    // Check if there are any messages to export
    if (sessionToExport.messages.length === 0) {
      alert('Cannot export an empty session.');
      return;
    }

    try {
      exportSessionToPDF(sessionToExport);
    } catch (error) {
      console.error('Failed to export session:', error);
      alert('Failed to export session. Please try again.');
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
      aria-label="Export session to PDF"
    >
      <Download className="w-4 h-4" />
      Export
    </Button>
  );
};

export default ExportButton;
