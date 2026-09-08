import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Statement, Document, Category } from '../types';
import { loadState, saveState } from '../utils/localStorage';
import { initialCategories } from '../data/sampleData';
import { TFIDF } from '../utils/tfidf';
import { useToast } from './ToastContext';

// ----- State -----
interface RegisterState {
  documents: Document[];
  statements: Statement[];
  categories: Category[];
  nextCategoryId: number;
  docCounter: number;
}

type RegisterAction =
  | { type: 'SET_STATE'; payload: RegisterState }
  | { type: 'ADD_STATEMENT'; payload: Statement }
  | { type: 'UPDATE_STATEMENT'; payload: { id: string; updates: Partial<Statement> } }
  | { type: 'DELETE_STATEMENT'; payload: string }
  | { type: 'ADD_DOCUMENT'; payload: Document }
  | { type: 'REMOVE_DOCUMENT'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'CLEAR_ALL' };

function registerReducer(state: RegisterState, action: RegisterAction): RegisterState {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'ADD_STATEMENT':
      return { ...state, statements: [...state.statements, action.payload] };
    case 'UPDATE_STATEMENT': {
      const { id, updates } = action.payload;
      return {
        ...state,
        statements: state.statements.map(s => s.id === id ? { ...s, ...updates } : s)
      };
    }
    case 'DELETE_STATEMENT':
      return { ...state, statements: state.statements.filter(s => s.id !== action.payload) };
    case 'ADD_DOCUMENT':
      return { ...state, documents: [...state.documents, action.payload] };
    case 'REMOVE_DOCUMENT': {
      const docId = action.payload;
      const doc = state.documents.find(d => d.id === docId);
      if (!doc) return state;
      const stmtIds = new Set(doc.statements.map(s => s.id));
      return {
        ...state,
        documents: state.documents.filter(d => d.id !== docId),
        statements: state.statements.filter(s => !stmtIds.has(s.id))
      };
    }
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'CLEAR_ALL':
      return {
        documents: [],
        statements: [],
        categories: initialCategories,
        nextCategoryId: 5,
        docCounter: 1
      };
    default:
      return state;
  }
}

const STORAGE_KEY = 'changeflow_register_state';

// ----- Context -----
interface RegisterContextValue {
  state: RegisterState;
  categories: Category[];
  addStatement: (text?: string) => void;
  updateStatement: (id: string, updates: Partial<Statement>) => void;
  deleteStatement: (id: string) => void;
  addDocument: (doc: Document) => void;
  removeDocument: (id: string) => void;
  addCategory: (name: string) => void;
  clearAll: () => void;
  loadSample: () => void;
  runAI: () => Promise<Array<{ id: string; theme: string; confidence: number }>>;
  applyAISuggestions: (suggestions: Array<{ id: string; theme: string }>) => void;
}

const RegisterContext = createContext<RegisterContextValue | null>(null);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();
  const [state, dispatch] = useReducer(registerReducer, {
    documents: [],
    statements: [],
    categories: initialCategories,
    nextCategoryId: 5,
    docCounter: 1
  });

  // Load from localStorage
  useEffect(() => {
    const saved = loadState<RegisterState>(STORAGE_KEY);
    if (saved) {
      dispatch({ type: 'SET_STATE', payload: saved });
    } else {
      // Load sample data if no saved state
      // We'll call loadSample() but that's an action; we can do it after mount
    }
  }, []);

  // Save on change
  useEffect(() => {
    saveState(STORAGE_KEY, state);
  }, [state]);

  // ----- Actions -----
  const addStatement = useCallback((text: string = 'New statement') => {
    const newStmt: Statement = {
      id: 's' + Date.now() + Math.random().toString(36).slice(2, 6),
      text,
      docId: null,
      categoryId: null,
      impact: 'Medium',
      action: '',
      owner: '',
      status: 'Open',
      sentiment: undefined,
      needsReview: false,
    };
    dispatch({ type: 'ADD_STATEMENT', payload: newStmt });
    toast.showToast('Row added');
  }, [toast]);

  const updateStatement = useCallback((id: string, updates: Partial<Statement>) => {
    dispatch({ type: 'UPDATE_STATEMENT', payload: { id, updates } });
  }, []);

  const deleteStatement = useCallback((id: string) => {
    if (window.confirm('Delete this row?')) {
      dispatch({ type: 'DELETE_STATEMENT', payload: id });
      toast.showToast('Row deleted');
    }
  }, [toast]);

  const addDocument = useCallback((doc: Document) => {
    dispatch({ type: 'ADD_DOCUMENT', payload: doc });
    // Add its statements if not already present
    doc.statements.forEach(s => {
      const exists = state.statements.some(ex => ex.text === s.text && ex.docId === s.docId);
      if (!exists) {
        dispatch({ type: 'ADD_STATEMENT', payload: s });
      }
    });
    toast.showToast(`Extracted ${doc.statements.length} statements from "${doc.name}"`);
  }, [state.statements, toast]);

  const removeDocument = useCallback((id: string) => {
    const doc = state.documents.find(d => d.id === id);
    if (!doc) return;
    dispatch({ type: 'REMOVE_DOCUMENT', payload: id });
    toast.showToast(`Removed document "${doc.name}" and its statements`);
  }, [state.documents, toast]);

  const addCategory = useCallback((name: string) => {
    const newCat = { id: `cat${state.nextCategoryId++}`, name };
    dispatch({ type: 'ADD_CATEGORY', payload: newCat });
    toast.showToast('Category added');
  }, [state.nextCategoryId, toast]);

  const clearAll = useCallback(() => {
    if (window.confirm('Remove all documents, statements, and categories?')) {
      dispatch({ type: 'CLEAR_ALL' });
      toast.showToast('All data cleared');
    }
  }, [toast]);

  // Sample document loader
  const loadSample = useCallback(() => {
    const sampleText = `
      I don't understand why we need to change the current process.
      The new system seems more complicated than the old one.
      I'm worried about my role becoming redundant after this change.
      We haven't received enough training on the new tools.
      The project timeline is unrealistic and puts pressure on my team.
      I don't trust the data migration plan, it feels risky.
      The communication from leadership has been inconsistent.
      I'm not convinced this change will actually improve our workflow.
      There is no clear owner for the issues we're facing.
      My team wasn't consulted before the decision was made.
      The new software lacks features we currently rely on.
      I'm concerned about the impact on our customer support SLAs.
    `;
    const docId = 'doc_' + state.docCounter;
    const doc: Document = {
      id: docId,
      name: 'Sample_Interview.txt',
      type: 'txt',
      statements: []
    };
    const sentences = sampleText.split(/\n+/).filter(s => s.trim().length > 15);
    const stmts: Statement[] = sentences.map((s, i) => ({
      id: 's' + Date.now() + i + Math.random().toString(36).slice(2, 6),
      text: s.trim(),
      docId: docId,
      categoryId: null,
      impact: 'Medium',
      action: '',
      owner: '',
      status: 'Open',
      sentiment: undefined,
      needsReview: false,
    }));
    doc.statements = stmts;
    addDocument(doc);
  }, [state.docCounter, addDocument]);

  // AI logic
  const runAI = useCallback(async () => {
    const statements = state.statements;
    if (statements.length === 0) {
      toast.showToast('No statements to analyze.');
      return [];
    }
    const tfidf = new TFIDF();
    const themes = ['Lack of Awareness', 'Fear & Trust Issues', 'Process Complexity', 'Operational Concerns', 'General Issues'];
    tfidf.fit(statements, themes);
    const suggestions = statements.map(s => {
      const pred = tfidf.predict(s.text);
      const top = pred[0];
      return { id: s.id, theme: top[0], confidence: top[1] };
    });
    return suggestions;
  }, [state.statements, toast]);

  const applyAISuggestions = useCallback((suggestions: Array<{ id: string; theme: string }>) => {
    suggestions.forEach(({ id, theme }) => {
      const stmt = state.statements.find(s => s.id === id);
      if (!stmt) return;
      let cat = state.categories.find(c => c.name === theme);
      if (!cat) {
        const newCat = { id: `cat${state.nextCategoryId++}`, name: theme };
        dispatch({ type: 'ADD_CATEGORY', payload: newCat });
        cat = newCat;
      }
      updateStatement(id, { categoryId: cat.id });
    });
    toast.showToast(`Applied ${suggestions.length} AI suggestions`);
  }, [state.statements, state.categories, state.nextCategoryId, updateStatement, toast]);

  const contextValue: RegisterContextValue = {
    state,
    categories: state.categories,
    addStatement,
    updateStatement,
    deleteStatement,
    addDocument,
    removeDocument,
    addCategory,
    clearAll,
    loadSample,
    runAI,
    applyAISuggestions,
  };

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const ctx = useContext(RegisterContext);
  if (!ctx) throw new Error('useRegister must be used within RegisterProvider');
  return ctx;
};