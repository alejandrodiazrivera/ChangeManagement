import { Statement, Category } from '../types';

export function exportRegisterCSV(statements: Statement[], categories: Category[], getDocName: (id: string | null) => string) {
  if (statements.length === 0) return;
  const rows = [
    ['ID', 'Issue / Resistance', 'Cause / Diagnosis', 'Impact', 'Action', 'Owner', 'Status', 'Source Document']
  ];
  statements.forEach(s => {
    const cat = categories.find(c => c.id === s.categoryId);
    rows.push([
      s.id,
      `"${s.text.replace(/"/g, '""')}"`,
      cat ? cat.name : 'Uncategorized',
      s.impact || 'Medium',
      `"${(s.action || '').replace(/"/g, '""')}"`,
      `"${(s.owner || '').replace(/"/g, '""')}"`,
      s.status || 'Open',
      getDocName(s.docId)
    ]);
  });
  const csv = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'issue_register.csv';
  link.click();
}