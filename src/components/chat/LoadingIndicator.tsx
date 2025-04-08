import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  type?: 'spinner' | 'typing' | 'skeleton';
  className?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ type = 'spinner', className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {type === 'typing' && (
        <div className="flex space-x-1" aria-label="AI is typing">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      )}
      {type === 'skeleton' && (
        <div className="w-full h-6 bg-gray-300 animate-pulse rounded" aria-hidden="true"></div>
      )}
      {type === 'spinner' && (
        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" aria-label="Loading"></div>
      )}
    </motion.div>
  );
};

export default LoadingIndicator;
