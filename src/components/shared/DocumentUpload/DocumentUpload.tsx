import React, { useRef } from 'react';
import { useRegister } from '../../../context/RegisterContext';
import { Statement } from '../../../types';
import { Button } from '../../ui/Button';

export const DocumentUpload: React.FC = () => {
  const { state, addDocument, loadSample, clearAll } = useRegister();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    for (const file of files) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const docId = 'doc_' + (state.docCounter + 1);
      const doc = {
        id: docId,
        name: file.name,
        type: file.name.split('.').pop() || 'txt',
        statements: [] as Statement[],
      };
      // simple extraction
      const parts = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 15);
      const stmts = parts.map(s => ({
        id: 's' + Date.now() + Math.random().toString(36).slice(2, 6),
        text: s.trim(),
        docId: docId,
        categoryId: null,
        impact: 'Medium' as const,
        action: '',
        owner: '',
        status: 'Open' as const,
      }));
      doc.statements = stmts;
      addDocument(doc);
    };
    reader.readAsText(file);
  };

  return (
    <section className="doc-upload-section" style={{ flexShrink: 0 }}>
      <div className="doc-upload-header">
        <h2><i className="fas fa-file-alt"></i> Source Documents</h2>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span className="count">{state.documents.length}</span>
          <Button variant="outline" size="sm" onClick={loadSample}>
            <i className="fas fa-file-import"></i> Load Sample
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            <i className="fas fa-trash-alt"></i> Clear All
          </Button>
        </div>
      </div>
      <div
        className="upload-zone"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
        onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
        onDrop={handleFileDrop}
      >
        <i className="fas fa-cloud-upload-alt"></i>
        <p>Drop interview transcripts or documents here</p>
        <p className="hint">or click to browse · .txt, .docx, .pdf</p>
        <input type="file" ref={fileInputRef} multiple accept=".txt,.docx,.pdf" onChange={(e) => {
          if (e.target.files) {
            for (const file of e.target.files) processFile(file);
            e.target.value = '';
          }
        }} />
      </div>
      <div className="doc-list" id="docList">
        {state.documents.length === 0 && <span style={{ color: '#8b95a9', fontSize: '12px', padding: '4px 0' }}>No documents uploaded yet</span>}
        {state.documents.map(doc => (
          <div className="doc-item" key={doc.id}>
            <i className={`fas fa-file-${doc.type === 'pdf' ? 'pdf' : doc.type === 'docx' ? 'word' : 'alt'}`}></i>
            <span className="doc-name" title={doc.name}>{doc.name}</span>
            <span className="doc-stat">({doc.statements.length})</span>
            <button className="doc-remove" onClick={() => {}}><i className="fas fa-times"></i></button>
          </div>
        ))}
      </div>
    </section>
  );
};