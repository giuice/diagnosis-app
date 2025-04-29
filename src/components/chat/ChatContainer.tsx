import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import NewDiagnosisButton from '@/components/session/NewDiagnosisButton';
import InputArea from './InputArea';
import MessageList from './MessageList';
import { useChatStore } from '@/store/useChatStore';
import { useSessionStore } from '@/store/useSessionStore';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import { AnimatePresence, motion } from 'framer-motion';
import { classifyError, NetworkError, ValidationError, QuotaError } from '@/lib/errors/apiErrors';

const ChatContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addUserMessage = useChatStore((state) => state.addUserMessage);
  const sendMessageToAPI = useChatStore((state) => state.sendMessageToAPI);
  const chatMessages = useChatStore((state) => state.messages);

  const saveCurrentSession = useSessionStore((state) => state.saveCurrentSession);
  const currentSession = useSessionStore((state) => state.currentSession);

  const handleSendMessage = async (message: string) => {
    addUserMessage(message);
    setIsLoading(true);
    setError(null);
    try {
      await sendMessageToAPI(message);
    } catch (err) {
      console.error(err);
      const classified = classifyError(err);
      if (classified instanceof NetworkError) {
        setError('Network error. Please check your connection and try again.');
      } else if (classified instanceof QuotaError) {
        setError('API quota exceeded. Please wait before trying again.');
      } else if (classified instanceof ValidationError) {
        setError('Invalid request. Please review your input.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    const lastUserMessage = [...chatMessages].reverse().find((m) => m.role === 'user');
    if (!lastUserMessage) return;
    await handleSendMessage(lastUserMessage.content);
  };

  const handleSaveSession = () => {
    if (!currentSession) return;
    if (!chatMessages || chatMessages.length === 0) {
      alert('Cannot save an empty session.');
      return;
    }
    currentSession.messages = chatMessages;
    saveCurrentSession(chatMessages);
  };

  return (
    <Card className="flex flex-col h-full max-h-screen w-full max-w-3xl mx-auto shadow-lg bg-background">      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Diagnosis Assistant</h2>
        <div className="space-x-2">
          <button
            onClick={handleSaveSession}
            className="px-3 py-1 rounded bg-muted hover:bg-muted/80"
          >
            Save Session
          </button>
        </div>
      </div>

      {/* Message list */}
      <div
        className="flex-1 overflow-y-auto"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        <MessageList messages={chatMessages} />
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="p-4 flex justify-start"
            >
              <LoadingIndicator type="typing" />
            </motion.div>
          )}
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              <ErrorMessage message={error} onRetry={handleRetry} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
};

export default ChatContainer;
