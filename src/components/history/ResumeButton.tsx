import React, { useState } from 'react';
import { Button } from '../ui/button';
import { RotateCw } from 'lucide-react';
import type { Session } from '@/lib/types/sessionTypes';
import { resumeSession } from '@/lib/utils/sessionResumption';

interface ResumeButtonProps {
  session: Session;
  loadSession: (data: { messages: any[]; metadata: any }) => void;
  disabled?: boolean;
  hasActiveSessionContent: boolean;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({ session, loadSession, disabled, hasActiveSessionContent }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await resumeSession({ session, loadSession, hasActiveSessionContent });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={disabled || loading} variant="outline" size="sm">
      {loading ? 'Resuming...' : <><RotateCw className="mr-1 h-4 w-4" /> Resume</>}
    </Button>
  );
};

export default ResumeButton;
