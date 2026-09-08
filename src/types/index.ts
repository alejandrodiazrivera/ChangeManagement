// Statement (for Register)
export interface Statement {
  id: string;
  text: string;
  docId: string | null;
  categoryId: string | null;
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  action: string;
  owner: string;
  status: 'Open' | 'In Progress' | 'Mitigated' | 'Closed' | 'Escalated';
  sentiment?: 'positive' | 'negative' | 'neutral';
  needsReview?: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  statements: Statement[];
}

export interface Category {
  id: string;
  name: string;
}

// Communication (for Engagement)
export interface Communication {
  id: number;
  stakeholder: string;
  message: string;
  channel: string;
  sender: string;
  startDate: string;
  endDate: string;
  time: string;
}

export type PeriodType = 'day' | 'week' | 'month';