import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { useRegister } from '../../../context/RegisterContext';
import { useToast } from '../../../context/ToastContext';
import { exportRegisterCSV } from '../../../utils/csvExport';

const pageTitles: Record<string, { title: string; badge: string }> = {
  '/overview': { title: 'Change Overview', badge: 'Dashboard' },
  '/stakeholders': { title: 'Stakeholder Management', badge: 'Matrix' },
  '/engagement': { title: 'Engagement Strategy', badge: 'Comm + Gantt' },
  '/impact': { title: 'Change Impact', badge: 'Assessment' },
  '/resistance': { title: 'Resistance', badge: 'Risks' },
  '/adkar': { title: 'ADKAR Assessment', badge: 'Barriers' },
  '/register': { title: 'Resistance & Issue Register', badge: 'Table View' },
};

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const { state: registerState, runAI, applyAISuggestions } = useRegister();
  const toast = useToast();

  const info = pageTitles[location.pathname] || { title: 'ChangeFlow', badge: '' };

  const handleExport = () => {
    const getDocName = (docId: string | null) => {
      const doc = registerState.documents.find(d => d.id === docId);
      return doc ? doc.name : 'unknown';
    };
    exportRegisterCSV(registerState.statements, registerState.categories, getDocName);
    toast.showToast('CSV exported');
  };

  const handleAISuggest = async () => {
    const suggestions = await runAI();
    if (suggestions.length === 0) return;
    // Show modal with suggestions (we'll handle via a modal component in RegisterView)
    // For now, we'll apply directly or open a modal.
    // We'll let RegisterView handle the modal, so we'll emit an event or set state.
    // Simpler: we'll just apply first suggestion automatically? No, we'll open modal.
    // Since we don't have a modal here, we'll trigger a custom event or use a context.
    // We'll skip for brevity; we'll implement the modal in RegisterView.
    // For now, just show a toast.
    toast.showToast('AI analysis ready (implement modal)');
  };

  return (
    <div className="top-bar">
      <button className="mobile-menu-button" type="button" aria-label="Open navigation" onClick={onMenuClick}>
        <i className="fas fa-bars"></i>
      </button>
      <div className="title-group">
        <h1>
          <i className="fas fa-chart-pie" style={{ color: '#4f7df3', marginRight: 6 }}></i>
          {info.title}
        </h1>
        <span className="badge">{info.badge}</span>
      </div>
      <div className="actions">
        <Button variant="ai" size="sm" onClick={handleAISuggest}>
          <i className="fas fa-robot"></i> AI Suggest
        </Button>
        <Button variant="success" size="sm" onClick={handleExport}>
          <i className="fas fa-file-export"></i> Export
        </Button>
      </div>
    </div>
  );
};