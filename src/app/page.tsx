'use client'
import ChatContainer from "@/components/chat/ChatContainer";
import { useSessionStore } from "@/store/useSessionStore";
import { Button } from "@/components/ui/button";

export default function Home() {
  const currentSession = useSessionStore((state) => state.currentSession);
  const sessionHistory = useSessionStore((state) => state.sessionHistory);
  const createNewSession = useSessionStore((state) => state.createNewSession);
  const loadSession = useSessionStore((state) => state.loadSession);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl font-bold">
          {currentSession?.meta.title || "Untitled Session"}
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {currentSession?.meta.updatedAt ? new Date(currentSession.meta.updatedAt).toLocaleString() : "N/A"}
        </div>
      </div>

      <ChatContainer />
    </div>
  );
}
