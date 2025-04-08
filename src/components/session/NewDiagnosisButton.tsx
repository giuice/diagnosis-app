'use client'
import { Button } from "@/components/ui/button"; // adjust if Button is elsewhere
import { Plus } from "lucide-react";
import React from "react";
import { useSessionStore } from "@/store/useSessionStore";
import { useChatStore } from "@/store/useChatStore";


const NewDiagnosisButton: React.FC = () => {
  const saveCurrentSession = useSessionStore((s) => s.saveCurrentSession);
  const createNewSession = useSessionStore((s) => s.createNewSession);
  const messages = useChatStore((s) => s.messages);
  const clearMessages = useChatStore((s) => s.clearMessages);
  const setMetadata = useChatStore((s) => s.setMetadata);

  const handleClick = () => {
    const currentMessages = useChatStore.getState().messages;

    if (currentMessages.length > 0) {
      const confirmed = window.confirm(
        "Start a new diagnosis? Your current conversation will be saved."
      );
      if (!confirmed) return;
      saveCurrentSession(currentMessages);
    } else {
      alert('Cannot start a new diagnosis without any messages.');
      return; // Prevent creating empty session
    }

    clearMessages();

    const title = `Diagnosis ${new Date().toLocaleString()}`;
    const newSessionId = createNewSession(title, currentMessages);

    if (!newSessionId) {
      console.log('No new session created because message list was empty.');
      return;
    }

    setMetadata({
      sessionId: newSessionId,
      startTime: Date.now(),
    });
  };

  return (
    <Button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
      aria-label="Start a new diagnosis session"
    >
      <Plus className="w-4 h-4" />
      New Diagnosis
    </Button>
  );
};

export default NewDiagnosisButton;
