import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadState, saveState } from '../utils/localStorage';
import { initialCommunications } from '../data/sampleData';
import { useToast } from './ToastContext';
import type { Communication } from '../types';

const STORAGE_KEY = 'changeflow_comms_state';

interface CommunicationsContextValue {
  communications: Communication[];
  addCommunication: (comm: Omit<Communication, 'id'>) => void;
  deleteCommunication: (id: number) => void;
}

const CommunicationsContext = createContext<CommunicationsContextValue | null>(null);

export const CommunicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();
  const [communications, setCommunications] = useState<Communication[]>(() => {
    const saved = loadState<Communication[]>(STORAGE_KEY);
    return saved || initialCommunications;
  });

  useEffect(() => {
    saveState(STORAGE_KEY, communications);
  }, [communications]);

  const addCommunication = useCallback((comm: Omit<Communication, 'id'>) => {
    const newComm = { ...comm, id: Date.now() + Math.random() };
    setCommunications(prev => [...prev, newComm]);
    toast.showToast('Communication added!');
  }, [toast]);

  const deleteCommunication = useCallback((id: number) => {
    setCommunications(prev => prev.filter(c => c.id !== id));
    toast.showToast('Communication deleted');
  }, [toast]);

  return (
    <CommunicationsContext.Provider value={{ communications, addCommunication, deleteCommunication }}>
      {children}
    </CommunicationsContext.Provider>
  );
};

export const useCommunications = () => {
  const ctx = useContext(CommunicationsContext);
  if (!ctx) throw new Error('useCommunications must be used within CommunicationsProvider');
  return ctx;
};