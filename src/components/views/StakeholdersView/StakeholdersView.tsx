import React, { useState, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';
import { Card, CardHeader } from '../../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';
import { Badge } from '../../ui/Badge';

// ─── The Theory: Auto-calculate Strategy based on Influence & Support ───
const getStrategy = (influence: string, support: string): string => {
  if (influence === 'High') {
    if (support === 'High') return 'Collaborate';
    if (support === 'Medium') return 'Engage';
    if (support === 'Low') return 'Convert';
  }
  if (influence === 'Medium') {
    if (support === 'High') return 'Involve';
    if (support === 'Medium') return 'Keep Informed';
    if (support === 'Low') return 'Intensive Engagement';
  }
  if (influence === 'Low') {
    if (support === 'High') return 'Keep Satisfied';
    if (support === 'Medium') return 'Keep Informed';
    if (support === 'Low') return 'Monitor';
  }
  return 'Monitor';
};

// ─── Options for dropdowns ───
const options = ['High', 'Medium', 'Low'];

// Default roles available for quick selection — users can add more
const defaultRoles = [
  'Executive Sponsor',
  'Senior Leader',
  'Business Lead',
  'Change Owner',
  'Process Owner',
  'Project Manager',
  'Change Manager',
  'Product Owner',
  'Business Analyst',
  'Team Manager',
  'People Manager',
  'Subject Matter Expert',
  'End User',
  'Super User',
  'Change Champion',
  'Key Influencer',
  'Trainer',
  'Communications Lead',
  'HR / People Partner',
  'IT / Technical Owner',
  'IT Support',
  'Data Owner',
  'Compliance / Legal',
  'Procurement',
  'Vendor / External Partner',
  'Customer',
  'Regulator',
  'Other',
];

export const StakeholdersView: React.FC = () => {
  const [stakeholders, setStakeholders] = useState([
    {
      id: 1,
      name: 'CEO',
      role: 'Executive Sponsor',
      impact: 'Low',
      influence: 'High',
      support: 'High',
      engagement: 'High',
    },
    {
      id: 2,
      name: 'Sales Director',
      role: 'Business Lead',
      impact: 'High',
      influence: 'High',
      support: 'Medium',
      engagement: 'Medium',
    },
    {
      id: 3,
      name: 'Warehouse Team',
      role: 'End Users',
      impact: 'High',
      influence: 'Medium',
      support: 'Low',
      engagement: 'Low',
    },
    {
      id: 4,
      name: 'Finance',
      role: 'Process Owner',
      impact: 'Medium',
      influence: 'Medium',
      support: 'High',
      engagement: 'High',
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [roles, setRoles] = useState<string[]>(defaultRoles);
  const [searchQuery, setSearchQuery] = useState('');
  const rowRefs = useRef<Record<number, HTMLTableRowElement | null>>({});

  const filteredStakeholders = stakeholders.filter((s) => {
    const haystack = [s.name, s.role, s.impact, s.influence, s.support, s.engagement, getStrategy(s.influence, s.support)]
      .join(' ')
      .toLowerCase();
    return haystack.includes(searchQuery.trim().toLowerCase());
  });

  const addStakeholder = () => {
    const newId = Date.now();
    setSearchQuery('');
    setStakeholders((prev) => [
      ...prev,
      {
        id: newId,
        name: '',
        role: '',
        impact: 'Low',
        influence: 'Low',
        support: 'Low',
        engagement: 'Low',
      },
    ]);
    setEditingId(newId);

    requestAnimationFrame(() => {
      rowRefs.current[newId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const updateStakeholder = (id: number, field: string, value: string) => {
    setStakeholders((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const deleteStakeholder = (id: number) => {
    setStakeholders((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const critical = stakeholders.filter((s) => s.impact === 'High' && s.support === 'Low');
  const highRisk = stakeholders.filter(
    (s) => (s.impact === 'High' && s.support === 'Medium') || (s.impact === 'Medium' && s.support === 'Low')
  );

  const plotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let resizeObserver: ResizeObserver | null = null;

    const loadPlotly = () =>
      new Promise<any>((resolve) => {
        if ((window as any).Plotly) return resolve((window as any).Plotly);
        const s = document.createElement('script');
        s.src = 'https://cdn.plot.ly/plotly-2.27.0.min.js';
        s.async = true;
        s.onload = () => resolve((window as any).Plotly);
        document.head.appendChild(s);
      });

    loadPlotly().then((Plotly) => {
      if (!mounted) return;
      if (!plotRef.current) return;

      const mapSupportX = (support: string) => (support === 'High' ? 4 : support === 'Medium' ? 0 : -4);
      const mapInfluenceY = (influence: string) => (influence === 'High' ? 4.6 : influence === 'Medium' ? 3.0 : 1.4);
      const impactValue = (impact: string) => (impact === 'High' ? 88 : impact === 'Medium' ? 55 : 25);
      const colorMap: Record<string, string> = { High: '#7c3aed', Medium: '#0284c7', Low: '#64748b' };

      // deterministic seeded jitter to avoid overlapping labels
      const seeded = (str: string) => {
        let h = 0;
        for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
        return Math.abs(Math.sin(h));
      };
      const jitterX = (seed: string) => (seeded(seed) - 0.5) * 1.6; // ±0.8
      const jitterY = (seed: string) => (seeded(seed + 'y') - 0.5) * 0.8; // ±0.4

      const points = stakeholders.map((s, idx) => {
        const seed = `${s.id}-${s.name}-${idx}`;
        const jx = jitterX(seed);
        const jy = jitterY(seed);
        return {
          name: s.name || 'New stakeholder',
          role: s.role || '',
          support: s.support,
          influence: s.influence,
          impact: s.impact,
          x: mapSupportX(s.support) + jx,
          y: mapInfluenceY(s.influence) + jy,
          jx,
          jy,
          size: Math.sqrt(impactValue(s.impact)) * 1.8 + 4,
          color: colorMap[s.engagement] || '#64748b',
        };
      });

      const hoverTexts = points.map(
        (p) =>
          `<b>${p.name}</b> (${p.role})<br>` +
          `Support: ${p.support}<br>` +
          `Influence: ${p.influence}<br>` +
          `Impact: ${p.impact}<br>` +
          `<b>Strategy: ${getStrategy(p.influence, p.support)}</b>`
      );

      const trace: any = {
        x: points.map((p) => p.x),
        y: points.map((p) => p.y),
        mode: 'markers+text',
        text: points.map((p) => p.name),
        textposition: points.map((p) => (p.jx && p.jx > 0 ? 'top right' : 'top left')),
        textfont: { size: 11 },
        hoverinfo: 'text',
        hovertext: hoverTexts,
        marker: {
          size: points.map((p) => p.size),
          color: points.map((p) => p.color),
          line: { color: 'white', width: 1.5 },
          opacity: 0.92,
          sizemode: 'area',
        },
        showlegend: false,
      };

      const watermarkConfig = [
        { x: -4, y: 4.6, label: 'CONVERT' },
        { x: 0, y: 4.6, label: 'ENGAGE' },
        { x: 4, y: 4.6, label: 'COLLABORATE' },
        { x: -4, y: 3.0, label: 'INTENSIVE<br>ENGAGEMENT' },
        { x: 0, y: 3.0, label: 'KEEP<br>INFORMED' },
        { x: 4, y: 3.0, label: 'INVOLVE' },
        { x: -4, y: 1.4, label: 'MONITOR' },
        { x: 0, y: 1.4, label: 'KEEP<br>INFORMED' },
        { x: 4, y: 1.4, label: 'KEEP<br>SATISFIED' },
      ];

      const annotations = watermarkConfig.map((w) => ({
        x: w.x,
        y: w.y,
        text: `<i>${w.label}</i>`,
        showarrow: false,
        font: {
          size: 20,
          color: 'rgba(18, 114, 218, 0.46)',
          weight: 800,
          family: 'Segoe UI, sans-serif'
        },
        xanchor: 'center',
        yanchor: 'middle',
      }));

      const layout: any = {
        xaxis: { title: null, range: [-6, 6], zeroline: false, showticklabels: false, ticks: '' },
        yaxis: { title: null, range: [0.5, 5.5], zeroline: false, showticklabels: false, ticks: '' },
        margin: { l: 30, r: 20, t: 30, b: 30 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        annotations,
        shapes: [
          { type: 'line', x0: -2, y0: 0.5, x1: -2, y1: 5.5, line: { color: '#c5d0e3', width: 1.5, dash: 'dash' } },
          { type: 'line', x0: 2, y0: 0.5, x1: 2, y1: 5.5, line: { color: '#c5d0e3', width: 1.5, dash: 'dash' } },
          { type: 'line', x0: -6, y0: 2.33, x1: 6, y1: 2.33, line: { color: '#c5d0e3', width: 1.5, dash: 'dash' } },
          { type: 'line', x0: -6, y0: 3.66, x1: 6, y1: 3.66, line: { color: '#c5d0e3', width: 1.5, dash: 'dash' } },
        ],
        hovermode: 'closest',
      };

      try {
        (Plotly as any).newPlot(plotRef.current, [trace], layout, { responsive: true, displayModeBar: false });

        // Ensure Plotly recalculates layout when the container resizes (fixes offset overlays)
        const plotEl = plotRef.current as HTMLElement;
        if (plotEl && (window as any).Plotly && typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(() => {
            try {
              (window as any).Plotly.Plots.resize(plotEl);
            } catch (err) {
              // ignore
            }
          });
          resizeObserver.observe(plotEl);
        }
      } catch (e) {
        // ignore
      }
    });

    return () => {
      mounted = false;
      if (plotRef.current && (window as any).Plotly) {
        try {
          (window as any).Plotly.purge(plotRef.current);
        } catch (e) {}
      }
      if (resizeObserver) {
        try {
          resizeObserver.disconnect();
        } catch (e) {}
      }
    };
  }, [stakeholders]);

  return (
    <>
      {/* TOP: Map + Priority */}
      <div className="grid-2 stakeholders-panel">
        <Card>
          <CardHeader>
            <div>
              <h2>Stakeholder Position Map</h2>
              <span>Map stakeholder positions and engagement priorities</span>
            </div>
          </CardHeader>
          <div style={{ padding: '8px 12px' }}>
            <div ref={plotRef} id="stakeholder-plot" style={{ width: '100%', height: 260 }} />
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <h2>Engagement Priorities</h2>
              <span>Stakeholder map</span>
            </div>
          </CardHeader>
          <span>Requires attention</span>

          {critical.length > 0 && (
            <p className="stakeholder-priority-copy">
              🔴 <strong>Critical:</strong>{' '}
              {critical.map((s) => s.name || 'New stakeholder').join(' & ')} — High Impact + Low Support →{' '}
              <strong>{critical.map((s) => getStrategy(s.influence, s.support)).join(' / ')}</strong>
            </p>
          )}

          {highRisk.length > 0 && (
            <p className="stakeholder-priority-copy">
              🟡 <strong>High:</strong>{' '}
              {highRisk.map((s) => s.name || 'New stakeholder').join(' & ')} —{' '}
              {highRisk
                .map((s) => ` ${s.name || 'New stakeholder'} (${getStrategy(s.influence, s.support)})`)
                .join('; ')}
            </p>
          )}

          {critical.length === 0 && highRisk.length === 0 && (
            <p className="stakeholder-priority-copy">✅ All stakeholders are aligned. Maintain current strategy.</p>
          )}

          <p className="stakeholder-priority-copy" style={{ marginTop: '12px', borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>
            <strong>Next step:</strong> {critical.length > 0 ? critical.map((s) => s.name || 'New stakeholder').join(' & ') : highRisk.length > 0 ? highRisk.map((s) => s.name || 'New stakeholder').join(' & ') : 'maintaining alignment'} before the next milestone.
          </p>
        </Card>
      </div>

      {/* Bottom: Management table */}
      <Card style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', minHeight: 0 }}>
        <div className="module-toolbar" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2>Stakeholder Analysis</h2>
            <span>Identify influence, support and engagement</span>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stakeholders..."
              aria-label="Search stakeholders"
              style={{
                minWidth: '220px',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#111827',
                backgroundColor: '#fff',
              }}
            />
            <button className="btn btn-primary btn-sm" onClick={addStakeholder}>
              + Add stakeholder
            </button>
          </div>
        </div>

        <div style={{ flex: '1 1 auto', overflow: 'auto', minHeight: 0 }}>
        <Table>
          <Thead>
            <Tr>
              <Th>Stakeholder</Th>
              <Th>Impact</Th>
              <Th>Influence</Th>
              <Th>Support / Engagement</Th>
              <Th>Strategy</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredStakeholders.map((s) => {
              const strategy = getStrategy(s.influence, s.support);
              const isEditing = editingId === s.id;

              return (
                <Tr
                  key={s.id}
                  ref={(el) => {
                    rowRefs.current[s.id] = el;
                  }}
                >
                  <Td>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={s.name}
                          onChange={(e) => updateStakeholder(s.id, 'name', e.target.value)}
                          placeholder="Enter name"
                          style={{ display: 'block', width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '4px' }}
                        />
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <input
                            list={`roles-list-${s.id}`}
                            type="text"
                            value={s.role}
                            onChange={(e) => updateStakeholder(s.id, 'role', e.target.value)}
                            placeholder="Enter or select role"
                            style={{ display: 'block', width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.75rem', color: '#6b7280' }}
                          />
                          <datalist id={`roles-list-${s.id}`}>
                            {roles.map((r) => (
                              <option key={r} value={r} />
                            ))}
                          </datalist>
                          <button
                            type="button"
                            onClick={() => {
                              const val = (document.querySelector(`input[list=roles-list-${s.id}]`) as HTMLInputElement)?.value?.trim();
                              if (val && !roles.includes(val)) setRoles((p) => [val, ...p]);
                              if (val) updateStakeholder(s.id, 'role', val);
                            }}
                            title="Add role"
                            style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f3f4f6', cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <strong>{s.name || '—'}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>{s.role || '—'}</span>
                      </>
                    )}
                  </Td>

                  <Td>
                    {isEditing ? (
                      <select value={s.impact} onChange={(e) => updateStakeholder(s.id, 'impact', e.target.value)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                        {options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>{s.impact}</span>
                    )}
                  </Td>

                  <Td>
                    {isEditing ? (
                      <select value={s.influence} onChange={(e) => updateStakeholder(s.id, 'influence', e.target.value)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                        {options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>{s.influence}</span>
                    )}
                  </Td>

                  <Td>
                    {isEditing ? (
                      <>
                        <select value={s.support} onChange={(e) => updateStakeholder(s.id, 'support', e.target.value)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                          {options.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', marginLeft: '4px' }}>/ {s.engagement}</span>
                      </>
                    ) : (
                      <span>
                        {s.support} / {s.engagement}
                      </span>
                    )}
                  </Td>

                  <Td>
                    <Badge
                      color={
                        strategy === 'Collaborate' || strategy === 'Convert'
                          ? 'purple'
                          : strategy === 'Engage' || strategy === 'Intensive Engagement'
                          ? 'yellow'
                          : strategy === 'Involve' || strategy === 'Keep Satisfied'
                          ? 'sky'
                          : 'gray'
                      }
                    >
                      {strategy}
                    </Badge>
                  </Td>

                  <Td style={{ whiteSpace: 'nowrap' }}>
                    {isEditing ? (
                      <>
                        <button onClick={() => setEditingId(null)} style={{ padding: '2px 10px', fontSize: '0.75rem', color: '#fff', backgroundColor: '#2563eb', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>
                          Save
                        </button>
                        <button onClick={cancelEdit} style={{ padding: '2px 10px', fontSize: '0.75rem', color: '#374151', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>
                          Cancel
                        </button>
                        <button onClick={() => deleteStakeholder(s.id)} style={{ padding: '2px 10px', fontSize: '0.75rem', color: '#dc2626', backgroundColor: 'transparent', border: '1px solid #dc2626', borderRadius: '4px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingId(s.id)}
                        aria-label={`Edit ${s.name || 'stakeholder'}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          padding: 0,
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          backgroundColor: '#fff',
                          color: '#374151',
                          cursor: 'pointer'
                        }}
                      >
                        <Settings size={14} />
                      </button>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        </div>
      </Card>
    </>
  );
};
