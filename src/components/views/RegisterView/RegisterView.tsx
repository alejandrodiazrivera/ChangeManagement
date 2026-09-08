import React, { useState } from 'react';
import { useRegister } from '../../../context/RegisterContext';
import { useToast } from '../../../context/ToastContext';
import { Button } from '../../ui/Button';
import { DocumentUpload } from '../../shared/DocumentUpload/DocumentUpload';
import { RegisterTable } from '../../shared/RegisterTable/RegisterTable';
import { AiModal } from '../../shared/AiModal/AiModal';

export const RegisterView: React.FC = () => {
  const { state, loadSample, clearAll, runAI, applyAISuggestions } = useRegister();
  const toast = useToast();
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<Array<{ id: string; theme: string; confidence: number }>>([]);

  const handleAISuggest = async () => {
    const suggestions = await runAI();
    if (suggestions.length === 0) return;
    setAiSuggestions(suggestions);
    setShowAiModal(true);
  };

  const handleApplySuggestions = () => {
    applyAISuggestions(aiSuggestions.map(s => ({ id: s.id, theme: s.theme })));
    setShowAiModal(false);
  };

  return (
    <>
      <DocumentUpload />
      <div className="register-container" style={{ flex: 1, marginTop: '12px' }}>
        <div className="register-toolbar">
          <div className="left">
            <span><i className="fas fa-list-ul"></i> Register</span>
            <span style={{ fontWeight: 400, color: '#8b95a9' }}>{state.statements.length} rows</span>
          </div>
          <div>
            <Button variant="outline" size="sm" onClick={() => {}}>Add Row</Button>
            <Button variant="outline" size="sm" onClick={() => {}}>Undo</Button>
            <Button variant="outline" size="sm" onClick={() => {}}>Redo</Button>
          </div>
        </div>
        <RegisterTable />
      </div>
      <AiModal
        isOpen={showAiModal}
        suggestions={aiSuggestions}
        onClose={() => setShowAiModal(false)}
        onApply={handleApplySuggestions}
      />
    </>
  );
};