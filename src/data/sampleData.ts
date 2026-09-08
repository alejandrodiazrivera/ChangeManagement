import { Communication, Statement } from '../types';

export const initialCommunications: Communication[] = (() => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();

  const pad = (n: number) => String(n).padStart(2, '0');
  const fmt = (dt: Date) => `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;

  return [
    {
      id: Date.now() + 1,
      stakeholder: 'Dev Team',
      message: 'Daily stand‑up & sync',
      channel: 'Slack',
      sender: 'Scrum Master',
      startDate: fmt(new Date(y, m, d)),
      endDate: fmt(new Date(y, m, d + 4)),
      time: '09:00'
    },
    {
      id: Date.now() + 2,
      stakeholder: 'Marketing',
      message: 'Campaign rollout',
      channel: 'Newsletter',
      sender: 'Comms Officer',
      startDate: fmt(new Date(y, m, d + 7)),
      endDate: fmt(new Date(y, m, d + 21)),
      time: '10:30'
    },
    {
      id: Date.now() + 3,
      stakeholder: 'Project Board',
      message: 'Quarterly business review',
      channel: 'Email + PDF',
      sender: 'Project Manager',
      startDate: fmt(new Date(y, m, 1)),
      endDate: fmt(new Date(y, m + 3, 1)),
      time: '15:00'
    }
  ];
})();

export const initialCategories = [
  { id: 'cat1', name: 'Lack of Awareness' },
  { id: 'cat2', name: 'Fear & Trust Issues' },
  { id: 'cat3', name: 'Process Complexity' },
  { id: 'cat4', name: 'Operational Concerns' },
];