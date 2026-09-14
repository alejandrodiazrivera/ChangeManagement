import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { loadState, saveState } from '../utils/localStorage';

export interface Stakeholder {
  id: number;
  name: string;
  role: string;
  impact: string;
  influence: string;
  attitude: string;
}

const STORAGE_KEY = 'changeflow_stakeholders_state';

const initialStakeholders: Stakeholder[] = [
  { id: 1, name: 'CEO', role: 'Executive Sponsor', impact: 'Low', influence: 'High', attitude: 'Very Supportive' },
  { id: 2, name: 'Sales Director', role: 'Business Lead', impact: 'High', influence: 'High', attitude: 'Supportive' },
  { id: 3, name: 'Warehouse Team', role: 'End Users', impact: 'High', influence: 'Medium', attitude: 'Resistant' },
  { id: 4, name: 'Finance', role: 'Process Owner', impact: 'Medium', influence: 'Medium', attitude: 'Mixed' },
];

interface StakeholdersContextValue {
  stakeholders: Stakeholder[];
  addStakeholder: () => number;
  updateStakeholder: (id: number, field: keyof Omit<Stakeholder, 'id'>, value: string) => void;
  deleteStakeholder: (id: number) => void;
}

const StakeholdersContext = createContext<StakeholdersContextValue | null>(null);

export const StakeholdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(() => loadState<Stakeholder[]>(STORAGE_KEY) || initialStakeholders);

  useEffect(() => {
    saveState(STORAGE_KEY, stakeholders);
  }, [stakeholders]);

  const addStakeholder = useCallback(() => {
    const id = Date.now();
    setStakeholders((current) => [
      ...current,
      { id, name: '', role: '', impact: 'Low', influence: 'Low', attitude: 'Mixed' },
    ]);
    return id;
  }, []);

  const updateStakeholder = useCallback(
    (id: number, field: keyof Omit<Stakeholder, 'id'>, value: string) => {
      setStakeholders((current) => current.map((stakeholder) =>
        stakeholder.id === id ? { ...stakeholder, [field]: value } : stakeholder,
      ));
    },
    [],
  );

  const deleteStakeholder = useCallback((id: number) => {
    setStakeholders((current) => current.filter((stakeholder) => stakeholder.id !== id));
  }, []);

  return (
    <StakeholdersContext.Provider value={{ stakeholders, addStakeholder, updateStakeholder, deleteStakeholder }}>
      {children}
    </StakeholdersContext.Provider>
  );
};

export const useStakeholders = () => {
  const context = useContext(StakeholdersContext);
  if (!context) throw new Error('useStakeholders must be used within StakeholdersProvider');
  return context;
};