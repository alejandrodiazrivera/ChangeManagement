import React, { useState } from 'react';
import { useCommunications } from '../../../context/CommunicationsContext';
import { Card, CardHeader } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { GanttChart } from '../../shared/GanttChart/GanttChart';
import { formatDateFull } from '../../../utils/dateHelpers';

export const EngagementView: React.FC = () => {
  const { communications, addCommunication, deleteCommunication } = useCommunications();
  const [form, setForm] = useState({
    stakeholder: 'Dev Team',
    message: '',
    channel: 'Slack',
    sender: '',
    startDate: formatDateFull(new Date()),
    endDate: formatDateFull(new Date(Date.now() + 7 * 86400000)),
    time: '09:00',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message || !form.sender) return alert('Message and sender required');
    addCommunication(form);
    setForm(prev => ({ ...prev, message: '', sender: '' }));
  };

  return (
    <>
      <div style={{ flexShrink: 0 }}>
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Stakeholder</label>
            <select name="stakeholder" value={form.stakeholder} onChange={handleChange}>
              <option value="Project Board">📊 Project Board</option>
              <option value="Dev Team">💻 Dev Team</option>
              <option value="Client">🤝 Client</option>
              <option value="Marketing">📣 Marketing</option>
              <option value="QA Team">🧪 QA Team</option>
              <option value="External Partner">🌐 External Partner</option>
            </select>
          </div>
          <div className="form-group">
            <label>Message</label>
            <input name="message" value={form.message} onChange={handleChange} placeholder="e.g. Weekly status" />
          </div>
          <div className="form-group">
            <label>Channel</label>
            <select name="channel" value={form.channel} onChange={handleChange}>
              <option value="Email + PDF">📧 Email + PDF</option>
              <option value="Slack">💬 Slack</option>
              <option value="Zoom">📹 Zoom</option>
              <option value="Newsletter">📨 Newsletter</option>
              <option value="Jira / Dashboard">🛠 Jira</option>
              <option value="Phone Call">📞 Phone</option>
            </select>
          </div>
          <div className="form-group">
            <label>Sender</label>
            <input name="sender" value={form.sender} onChange={handleChange} placeholder="e.g. Project Manager" />
          </div>
          <div className="form-group">
            <label>Start</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>End</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-add">➕ Add</button>
        </form>

        <Card style={{ marginBottom: '12px' }}>
          <CardHeader><h2>Communication Plan</h2><span>{communications.length} entries</span></CardHeader>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Stakeholder</th><th>Message</th><th>Channel</th><th>Sender</th><th>Start</th><th>End</th><th>Time</th><th style={{width:40}}></th></tr></thead>
              <tbody>
                {communications.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No communications added yet.</td></tr>
                ) : (
                  communications.map((c, idx) => {
                    const badgeClass = (c.stakeholder === 'Project Board' ? 'purple' :
                      c.stakeholder === 'Dev Team' ? 'sky' :
                      c.stakeholder === 'Client' ? 'green' :
                      c.stakeholder === 'Marketing' ? 'pink' :
                      c.stakeholder === 'QA Team' ? 'orange' : 'gray');
                    return (
                      <tr key={c.id}>
                        <td><Badge color={badgeClass as any}>{c.stakeholder}</Badge></td>
                        <td>{c.message}</td>
                        <td><span style={{ background: '#f1f5f9', padding: '0.15rem 0.7rem', borderRadius: '20px', fontSize: '0.7rem' }}>{c.channel}</span></td>
                        <td>{c.sender}</td>
                        <td>{c.startDate}</td>
                        <td>{c.endDate}</td>
                        <td>{c.time}</td>
                        <td><button className="delete-comm" onClick={() => deleteCommunication(c.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕</button></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div style={{ flex: 1, minHeight: '200px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 4px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>🗓️ Timeline <span style={{ fontWeight: 400, color: '#64748b', fontSize: '13px' }}>days</span></h2>
        </div>
        <div className="gantt-wrapper" style={{ flex: 1 }}>
          <GanttChart communications={communications} />
        </div>
        <div className="scale-note">Chart automatically groups by days, weeks, or months.</div>
        <div className="legend">
          <span style={{ fontWeight: 500, marginRight: 4 }}>🎨 Stakeholders:</span>
          <span className="legend-item"><span className="legend-swatch" style={{ background: '#7c3aed' }}></span> Board</span>
          <span className="legend-item"><span className="legend-swatch" style={{ background: '#2563eb' }}></span> Dev</span>
          <span className="legend-item"><span className="legend-swatch" style={{ background: '#16a34a' }}></span> Client</span>
          <span className="legend-item"><span className="legend-swatch" style={{ background: '#db2777' }}></span> Marketing</span>
          <span className="legend-item"><span className="legend-swatch" style={{ background: '#ea580c' }}></span> QA</span>
          <span className="legend-item"><span className="legend-swatch" style={{ background: '#0284c7' }}></span> External</span>
        </div>
      </div>
    </>
  );
};