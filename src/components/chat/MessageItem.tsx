import React from 'react';
import { User, Stethoscope, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  isLoading?: boolean;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2 items-start ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Stethoscope className="w-6 h-6 text-blue-500" />
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 whitespace-pre-wrap break-words shadow-sm transition-all
          ${isUser ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}
      >
        {message.isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            <span>Thinking...</span>
          </div>
        ) : (
          message.content
        )}
        {message.timestamp && (
          <div className="mt-1 text-xs text-gray-500 text-right">
            {message.timestamp}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <User className="w-6 h-6 text-green-500" />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
