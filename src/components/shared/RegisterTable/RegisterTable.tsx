import React from 'react';
import { useRegister } from '../../../context/RegisterContext';
import { Statement } from '../../../types';

export const RegisterTable: React.FC = () => {
  const { state, updateStatement, deleteStatement } = useRegister();

  if (state.statements.length === 0) {
    return (
      <div className="register-table-wrap">
        <table>
          <tbody>
            <tr><td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#8b95a9' }}>No statements yet. Upload a document or add a row.</td></tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="register-table-wrap">
      <table>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>ID</th>
            <th style={{ minWidth: '180px' }}>Issue / Resistance</th>
            <th style={{ minWidth: '150px' }}>Cause / Diagnosis</th>
            <th style={{ width: '110px' }}>Impact</th>
            <th style={{ minWidth: '140px' }}>Action</th>
            <th style={{ minWidth: '120px' }}>Owner</th>
            <th style={{ width: '120px' }}>Status</th>
            <th style={{ width: '40px' }}></th>
          </tr>
        </thead>
        <tbody>
          {state.statements.map((s: Statement) => {
            const cat = state.categories.find(c => c.id === s.categoryId);
            return (
              <tr key={s.id}>
                <td style={{ fontSize: '10px', fontWeight: 600, color: '#8b95a9' }}>{s.id.slice(0,4)}</td>
                <td className="statement-text" title="Click to expand">{s.text}</td>
                <td>
                  <select
                    className="table-category"
                    value={s.categoryId || ''}
                    onChange={(e) => updateStatement(s.id, { categoryId: e.target.value || null })}
                  >
                    <option value="">— Select —</option>
                    {state.categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="table-impact"
                    value={s.impact}
                    onChange={(e) => updateStatement(s.id, { impact: e.target.value as any })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="table-action"
                    value={s.action}
                    onChange={(e) => updateStatement(s.id, { action: e.target.value })}
                    placeholder="Enter action..."
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="table-owner"
                    value={s.owner}
                    onChange={(e) => updateStatement(s.id, { owner: e.target.value })}
                    placeholder="Enter owner..."
                  />
                </td>
                <td>
                  <select
                    className="table-status"
                    value={s.status}
                    onChange={(e) => updateStatement(s.id, { status: e.target.value as any })}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Mitigated">Mitigated</option>
                    <option value="Closed">Closed</option>
                    <option value="Escalated">Escalated</option>
                  </select>
                </td>
                <td>
                  <button className="delete-row" onClick={() => deleteStatement(s.id)}>
                    <i className="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};