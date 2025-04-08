import React from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import { Button } from '@/components/ui/button';
import MessageItem from '@/components/chat/MessageItem';
import { exportSessionToPDF } from '@/lib/utils/pdfExport';

const SessionViewer: React.FC = () => {
  const currentSession = useSessionStore((state) => state.currentSession);

  if (!currentSession) {
    return <div className="p-4">No session selected.</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">{currentSession.meta.title}</h2>
          <div className="text-sm text-gray-500">
            Created: {new Date(currentSession.meta.createdAt).toLocaleString()}<br />
            Updated: {new Date(currentSession.meta.updatedAt).toLocaleString()}
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => exportSessionToPDF(currentSession)}>Export</Button>
          <Button size="sm" onClick={() => console.log('Resume conversation')}>Resume</Button>
          <Button size="sm" variant="destructive" onClick={() => console.log('Delete session')}>Delete</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 border rounded p-2 max-h-[70vh] overflow-y-auto">
        {currentSession.messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  );
};

export default SessionViewer;
