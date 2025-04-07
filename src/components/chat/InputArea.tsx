import React, { useState } from 'react';
import { SendHorizonal, Loader2 } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t">
      <textarea
        className="flex-1 resize-none rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        rows={2}
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="rounded-full p-2 hover:bg-blue-100 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <SendHorizonal className="w-5 h-5 text-blue-500" />}
      </button>
    </form>
  );
};

export default InputArea;
