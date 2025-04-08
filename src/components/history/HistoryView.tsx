import React, { useState } from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import { Button } from '@/components/ui/button';

interface HistoryViewProps {
  onSelectSession?: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ onSelectSession }) => {
  const sessionHistory = useSessionStore((state) => state.sessionHistory);
  const loadSession = useSessionStore((state) => state.loadSession);
  const deleteSession = useSessionStore((state) => state.deleteSession);

  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedSessions = [...sessionHistory].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const filteredSessions = sortedSessions.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h2 className="text-xl font-semibold">Session History</h2>
        <div className="flex gap-2 items-center">
          <label className="text-sm">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      {filteredSessions.length === 0 ? (
        <p className="text-gray-500">No saved sessions.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredSessions.map((s) => (
            <div key={s.id} className="flex justify-between items-center border rounded p-2">
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-xs text-gray-500">
                  Created: {new Date(s.createdAt).toLocaleString()}<br />
                  Updated: {new Date(s.updatedAt).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { loadSession(s.id); onSelectSession?.(); }}>Load</Button>
                <Button size="sm" variant="secondary" onClick={() => alert('Export not implemented yet')}>Export</Button>
                <Button size="sm" variant="destructive" onClick={() => {
                  if (confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
                    deleteSession(s.id);
                  }
                }}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
