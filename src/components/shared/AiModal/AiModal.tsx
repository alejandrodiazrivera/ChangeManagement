import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/Button';

interface AiModalProps {
  isOpen: boolean;
  suggestions: Array<{ id: string; theme: string; confidence: number }>;
  onClose: () => void;
  onApply: () => void;
}

export const AiModal: React.FC<AiModalProps> = ({ isOpen, suggestions, onClose, onApply }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Simulate progress
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        if (p >= 100) clearInterval(interval);
        setProgress(Math.min(p, 100));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="ai-overlay active" onClick={onClose}>
      <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-icon"><i className="fas fa-brain"></i></div>
        <h3>AI Theme Detection</h3>
        <p>Running TF‑IDF similarity analysis on all statements...</p>
        <div className="ai-progress">
          <div className={`bar ${progress >= 100 ? 'complete' : ''}`} style={{ width: progress + '%' }}></div>
        </div>
        <div className="ai-results">
          {suggestions.slice(0, 10).map((s, idx) => (
            <div key={idx} className="ai-result-item">
              <span className="text" title={s.id}>{s.theme}</span>
              <span className="suggestion">{s.theme}</span>
              <span className="confidence">{Math.round(s.confidence * 100)}%</span>
            </div>
          ))}
          {suggestions.length > 10 && <div>... and {suggestions.length - 10} more</div>}
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onApply}>Apply Suggestions</Button>
        </div>
      </div>
    </div>
  );
};