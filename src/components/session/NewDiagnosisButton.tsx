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
    // Get the current messages *before* potentially clearing them
    const currentMessages = useChatStore.getState().messages;

    if (currentMessages.length > 0) {
      const confirmed = window.confirm(
        "Start a new diagnosis? Your current conversation will be saved."
      );
      if (!confirmed) return;
      saveCurrentSession(currentMessages); // Pass the latest messages
    } else {
      // If there are no messages, no need to save the "current" session.
      // Depending on logic, maybe saveCurrentSession should handle empty messages gracefully.
      // For now, we skip saving if there's nothing to save.
    }

    clearMessages(); // Clear messages *after* saving

    const title = `Diagnosis ${new Date().toLocaleString()}`;
    const newSessionId = createNewSession(title); // Capture the returned ID

    // Remove the redundant crypto.randomUUID() call

    setMetadata({
      sessionId: newSessionId, // Use the ID from the newly created session
      startTime: Date.now(), // Keep using Date.now() for start time
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
