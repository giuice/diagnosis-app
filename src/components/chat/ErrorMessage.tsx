import React from 'react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, className }) => {
  return (
    <div className={cn('p-2 bg-red-100 text-red-700 rounded flex items-center justify-between', className)}>
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-2 px-2 py-1 text-sm rounded bg-red-200 hover:bg-red-300"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
