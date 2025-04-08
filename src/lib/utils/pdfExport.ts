import jsPDF from 'jspdf';
import type { Session } from '@/lib/types/sessionTypes';;

export function exportSessionToPDF(session: Session) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(16);
  doc.text(session.meta.title || 'Diagnosis Session', 10, 20);

  doc.setFontSize(10);
  doc.text(`Created: ${new Date(session.meta.createdAt).toLocaleString()}`, 10, 28);
  doc.text(`Updated: ${new Date(session.meta.updatedAt).toLocaleString()}`, 10, 34);

  let y = 44;
  doc.setFontSize(12);

  session.messages.forEach((msg, idx) => {
    const prefix = msg.role === 'user' ? 'User: ' : 'AI: ';
    const lines = doc.splitTextToSize(prefix + msg.content, 180);
    if (y + lines.length * 6 > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines, 10, y);
    y += lines.length * 6 + 4;
  });

  const filename = `${session.meta.title || 'diagnosis_session'}.pdf`;
  doc.save(filename);
}
