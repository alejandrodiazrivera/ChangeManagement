import React, { useState, useEffect, useRef } from 'react';
import { CircleDot, Pencil, Trash2, Settings } from 'lucide-react';
import { Card, CardHeader } from '../../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../ui/Table';
import { useStakeholders } from '../../../context/StakeholdersContext';

// ─── The Theory: Attitude is a qualitative, ordered variable (Likert-style), not a continuous score ───
const attitudeOptions = ['Very Supportive', 'Supportive', 'Mixed', 'Resistant', 'Very Resistant', 'Other'];
const attitudeRank: Record<string, number> = attitudeOptions.reduce((acc, item, index) => {
  acc[item] = index;
  return acc;
}, {} as Record<string, number>);

const getAttitudeCode = (attitude: string): number => attitudeRank[attitude] ?? 0;

const getStrategy = (influence: string, attitude: string): string => {
  const attitudeCode = getAttitudeCode(attitude);
  const isVerySupportive = attitudeCode === 0;
  const isSupportive = attitudeCode === 1;
  const isMixed = attitudeCode === 2;
  const isResistant = attitudeCode >= 3;

  if (influence === 'High') {
    if (isVerySupportive || isSupportive) return 'Collaborate';
    if (isMixed) return 'Engage';
    if (isResistant) return 'Convert';
  }
  if (influence === 'Medium') {
    if (isVerySupportive || isSupportive) return 'Involve';
    if (isMixed) return 'Keep Informed';
    if (isResistant) return 'Intensive Engagement';
  }
  if (influence === 'Low') {
    if (isVerySupportive || isSupportive) return 'Keep Satisfied';
    if (isMixed) return 'Keep Informed';
    if (isResistant) return 'Monitor';
  }
  return 'Monitor';
};

// ─── Options for dropdowns ───
const options = ['High', 'Medium', 'Low'];
const attitudeValues = ['Very Supportive', 'Supportive', 'Mixed', 'Resistant', 'Very Resistant', 'Other'];

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
  const { stakeholders, addStakeholder: createStakeholder, updateStakeholder, deleteStakeholder } = useStakeholders();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [roles, setRoles] = useState<string[]>(defaultRoles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStakeholderIds, setSelectedStakeholderIds] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'impact' | 'influence' | 'attitude' | 'strategy'; direction: 'asc' | 'desc' | null } | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);
  const rowRefs = useRef<Record<number, HTMLTableRowElement | null>>({});

  const handleSort = (key: 'name' | 'impact' | 'influence' | 'attitude' | 'strategy') => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  };

  const getSortValue = (key: 'name' | 'impact' | 'influence' | 'attitude' | 'strategy', stakeholder: (typeof stakeholders)[number]) => {
    switch (key) {
      case 'name':
        return stakeholder.name || '';
      case 'impact':
        return stakeholder.impact || '';
      case 'influence':
        return stakeholder.influence || '';
      case 'attitude':
        return stakeholder.attitude || '';
      case 'strategy':
        return getStrategy(stakeholder.influence, stakeholder.attitude);
      default:
        return '';
    }
  };

  const toggleStakeholderSelection = (id: number, additiveSelection: boolean) => {
    setSelectedStakeholderIds((prev) => {
      if (additiveSelection) {
        return prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id];
      }

      if (prev.includes(id) && prev.length === 1) {
        return [];
      }

      return [id];
    });
  };

  const filteredStakeholders = stakeholders.filter((s) => {
    const haystack = [s.name, s.role, s.impact, s.influence, s.attitude, getStrategy(s.influence, s.attitude)]
      .join(' ')
      .toLowerCase();
    return haystack.includes(searchQuery.trim().toLowerCase());
  });

  const sortedStakeholders = [...filteredStakeholders].sort((a, b) => {
    if (!sortConfig || !sortConfig.direction) return 0;

    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    const aValue = getSortValue(sortConfig.key, a);
    const bValue = getSortValue(sortConfig.key, b);

    const priorityMap: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
    const isPriorityField = sortConfig.key === 'impact' || sortConfig.key === 'influence';

    if (sortConfig.key === 'attitude') {
      return (getAttitudeCode(String(aValue)) - getAttitudeCode(String(bValue))) * direction;
    }

    if (isPriorityField) {
      const aPriority = priorityMap[aValue] ?? 0;
      const bPriority = priorityMap[bValue] ?? 0;
      return (aPriority - bPriority) * direction;
    }

    return String(aValue).localeCompare(String(bValue)) * direction;
  });

  const addStakeholder = () => {
    const newId = createStakeholder();
    setSearchQuery('');
    setEditingId(newId);

    requestAnimationFrame(() => {
      rowRefs.current[newId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const removeStakeholder = (id: number) => {
    deleteStakeholder(id);
    if (editingId === id) setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const critical = stakeholders.filter((s) => s.impact === 'High' && ['Resistant', 'Very Resistant'].includes(s.attitude));
  const highRisk = stakeholders.filter(
    (s) =>
      (s.impact === 'High' && ['Mixed', 'Resistant'].includes(s.attitude)) ||
      (s.impact === 'Medium' && ['Resistant', 'Very Resistant', 'Mixed'].includes(s.attitude))
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

      const mapAttitudeX = (attitude: string) => {
        const rank = getAttitudeCode(attitude);
        if (attitude === 'Very Supportive') return 4;
        if (attitude === 'Supportive') return 2;
        if (attitude === 'Mixed') return 0;
        if (attitude === 'Resistant') return -2;
        if (attitude === 'Very Resistant') return -4;
        return 0;
      };
      const mapInfluenceY = (influence: string) => (influence === 'High' ? 4.6 : influence === 'Medium' ? 3.0 : 1.4);
      const impactValue = (impact: string) => (impact === 'High' ? 88 : impact === 'Medium' ? 55 : 25);
      const colorMap: Record<string, string> = {
        'Very Supportive': '#16a34a',
        Supportive: '#22c55e',
        Mixed: '#f59e0b',
        Resistant: '#f97316',
        'Very Resistant': '#dc2626',
        Other: '#64748b',
      };

      // deterministic seeded jitter to avoid overlapping labels
      const seeded = (str: string) => {
        let h = 0;
        for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
        return Math.abs(Math.sin(h));
      };
      const jitterX = (seed: string) => (seeded(seed) - 0.5) * 1.6; // ±0.8
      const jitterY = (seed: string) => (seeded(seed + 'y') - 0.5) * 0.8; // ±0.4

      const selectedIds = new Set(selectedStakeholderIds);

      const points = stakeholders.map((s, idx) => {
        const seed = `${s.id}-${s.name}-${idx}`;
        const jx = jitterX(seed);
        const jy = jitterY(seed);
        const isSelected = selectedIds.has(s.id);
        const baseSize = Math.sqrt(impactValue(s.impact)) * 1.8 + 4;

        return {
          name: s.name || 'New stakeholder',
          role: s.role || '',
          attitude: s.attitude,
          influence: s.influence,
          impact: s.impact,
          x: mapAttitudeX(s.attitude) + jx,
          y: mapInfluenceY(s.influence) + jy,
          jx,
          jy,
          size: baseSize,
          highlightedSize: isSelected ? baseSize * 1.25 : baseSize,
          color: colorMap[s.attitude] || '#64748b',
          isSelected,
        };
      });

      const hoverTexts = points.map(
        (p) =>
          `<b>${p.name}</b> (${p.role})<br>` +
          `Attitude: ${p.attitude}<br>` +
          `Influence: ${p.influence}<br>` +
          `Impact: ${p.impact}<br>` +
          `<b>Strategy: ${getStrategy(p.influence, p.attitude)}</b>`
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
          size: points.map((p) => (p.isSelected ? p.highlightedSize : p.size)),
          color: points.map((p) => p.color),
          line: {
            color: points.map((p) => (p.isSelected ? '#0f172a' : 'rgba(255,255,255,0.9)')),
            width: points.map((p) => (p.isSelected ? 4 : 1.5)),
          },
          opacity: points.map((p) => (p.isSelected ? 1 : 0.8)),
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
  }, [stakeholders, selectedStakeholderIds]);

  return (
    <>
      <style>{`
        .stakeholders-analysis-card {
          padding: 0;
          overflow: hidden;
          min-height: 0;
          flex: 0 0 auto !important;
        }

        .stakeholders-analysis-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 8px;
          margin-bottom: 8px;
          padding: 0 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .stakeholders-analysis-toolbar h2 {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
        }

        .stakeholders-analysis-toolbar span {
          display: block;
          margin: 0 0 0 8px;
          color: #6b7280;
          font-size: 13px;
        }

        .stakeholders-analysis-search {
          min-width: 220px !important;
          height: 24px !important;
          padding: 0 6px !important;
          border: 1px solid transparent !important;
          border-radius: 4px !important;
          background: transparent !important;
          color: #1a1d21 !important;
          font-size: 13px !important;
        }

        .stakeholders-analysis-search:hover,
        .stakeholders-analysis-search:focus {
          background: #f0f1f3 !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          outline: none;
        }

        .stakeholders-table-wrap {
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #fff;
          overflow: auto !important;
          flex: 0 0 auto !important;
          min-height: 0;
        }

        .stakeholders-table-wrap > .table-wrap {
          overflow: visible;
        }

        .stakeholders-table-wrap table {
          min-width: 760px !important;
          table-layout: fixed;
          font-size: 13px !important;
        }

        .stakeholders-table-wrap col:nth-child(1) {
          width: 30%;
        }

        .stakeholders-table-wrap col:nth-child(2),
        .stakeholders-table-wrap col:nth-child(3) {
          width: 13%;
        }

        .stakeholders-table-wrap col:nth-child(4) {
          width: 14%;
        }

        .stakeholders-table-wrap col:nth-child(5) {
          width: 22%;
        }

        .stakeholders-table-wrap col:nth-child(6) {
          width: 8%;
        }

        .stakeholders-table-wrap th,
        .stakeholders-table-wrap td {
          height: 32px !important;
          padding: 0 8px !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
          line-height: 1 !important;
          letter-spacing: -0.01em;
        }

        .stakeholders-table-wrap th {
          height: 28px !important;
          background: #fafafa !important;
          color: #6b7280 !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          letter-spacing: 0.02em !important;
        }

        .stakeholders-table-wrap th > button {
          color: #6b7280 !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          letter-spacing: 0.02em !important;
          text-transform: uppercase;
        }

        .stakeholders-table-wrap tbody tr {
          transition: background 80ms ease;
        }

        .stakeholders-table-wrap tbody tr:hover {
          background: #f0f1f3 !important;
        }

        .stakeholders-table-wrap tbody tr:last-child td {
          border-bottom: 0 !important;
        }

        .stakeholders-table-wrap td:last-child,
        .stakeholders-table-wrap th:last-child {
          width: 80px !important;
          min-width: 80px !important;
          text-align: center !important;
        }

        .stakeholders-table-wrap input[type='checkbox'] {
          width: 16px;
          height: 16px;
          accent-color: #6366f1;
        }

        .stakeholders-table-wrap .row-actions button {
          width: 24px !important;
          height: 24px !important;
          border-radius: 4px !important;
        }

        .stakeholder-status {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
          white-space: nowrap;
        }

        .stakeholder-status svg {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
        }

        .stakeholder-identity {
          display: flex;
          align-items: baseline;
          gap: 8px;
          min-width: 0;
          white-space: nowrap;
        }

        .stakeholder-identity strong,
        .stakeholder-identity span {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stakeholder-identity span {
          min-width: 0;
          color: #6b7280;
          font-size: 11px;
        }

        .stakeholder-identity span::before {
          content: '·';
          margin-right: 8px;
          color: #9ca3af;
        }

        @media (max-width: 900px) {
          .stakeholders-table-wrap table {
            table-layout: auto;
            min-width: 760px !important;
          }
        }
      `}</style>
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
              {critical.map((s) => s.name || 'New stakeholder').join(' & ')} — High impact with resistant or highly resistant attitude →{' '}
              <strong>{critical.map((s) => getStrategy(s.influence, s.attitude)).join(' / ')}</strong>
            </p>
          )}

          {highRisk.length > 0 && (
            <p className="stakeholder-priority-copy">
              🟡 <strong>High:</strong>{' '}
              {highRisk.map((s) => s.name || 'New stakeholder').join(' & ')} —{' '}
              {highRisk
                .map((s) => ` ${s.name || 'New stakeholder'} (${getStrategy(s.influence, s.attitude)})`)
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
      <Card className="stakeholders-analysis-card" style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', minHeight: 0 }}>
        <div className="module-toolbar stakeholders-analysis-toolbar" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2>Stakeholder Analysis</h2>
            <span>Identify influence and attitude</span>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="stakeholders-analysis-search"
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

        <div className="stakeholders-table-wrap" style={{ flex: '1 1 auto', overflow: 'auto', minHeight: 0 }}>
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <Thead>
            <Tr>
              <Th>
                <button type="button" onClick={() => handleSort('name')} style={{ border: 'none', background: 'transparent', padding: 0, fontWeight: 700, cursor: 'pointer', color: '#111827', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Stakeholder</span>
                  <span aria-hidden="true" style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '0.75rem', textAlign: 'center', opacity: sortConfig?.key === 'name' ? 1 : 0 }}>
                    {sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '') : ''}
                  </span>
                </button>
              </Th>
              <Th>
                <button type="button" onClick={() => handleSort('impact')} style={{ border: 'none', background: 'transparent', padding: 0, fontWeight: 700, cursor: 'pointer', color: '#111827', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Impact</span>
                  <span aria-hidden="true" style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '0.75rem', textAlign: 'center', opacity: sortConfig?.key === 'impact' ? 1 : 0 }}>
                    {sortConfig?.key === 'impact' ? (sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '') : ''}
                  </span>
                </button>
              </Th>
              <Th>
                <button type="button" onClick={() => handleSort('influence')} style={{ border: 'none', background: 'transparent', padding: 0, fontWeight: 700, cursor: 'pointer', color: '#111827', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Influence</span>
                  <span aria-hidden="true" style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '0.75rem', textAlign: 'center', opacity: sortConfig?.key === 'influence' ? 1 : 0 }}>
                    {sortConfig?.key === 'influence' ? (sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '') : ''}
                  </span>
                </button>
              </Th>
              <Th>
                <button type="button" onClick={() => handleSort('attitude')} style={{ border: 'none', background: 'transparent', padding: 0, fontWeight: 700, cursor: 'pointer', color: '#111827', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Attitude</span>
                  <span aria-hidden="true" style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '0.75rem', textAlign: 'center', opacity: sortConfig?.key === 'attitude' ? 1 : 0 }}>
                    {sortConfig?.key === 'attitude' ? (sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '') : ''}
                  </span>
                </button>
              </Th>
              <Th>
                <button type="button" onClick={() => handleSort('strategy')} style={{ border: 'none', background: 'transparent', padding: 0, fontWeight: 700, cursor: 'pointer', color: '#111827', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Strategy</span>
                  <span aria-hidden="true" style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '0.75rem', textAlign: 'center', opacity: sortConfig?.key === 'strategy' ? 1 : 0 }}>
                    {sortConfig?.key === 'strategy' ? (sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '') : ''}
                  </span>
                </button>
              </Th>
              <Th style={{ width: '80px', minWidth: '80px', textAlign: 'center' }}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedStakeholders.map((s) => {
              const strategy = getStrategy(s.influence, s.attitude);
              const isEditing = editingId === s.id;
              const isSelected = selectedStakeholderIds.includes(s.id);

              return (
                <Tr
                  key={s.id}
                  ref={(el) => {
                    rowRefs.current[s.id] = el;
                  }}
                  onMouseEnter={() => setHoveredRowId(s.id)}
                  onMouseLeave={() => setHoveredRowId((current) => (current === s.id ? null : current))}
                  onFocusCapture={() => setHoveredRowId(s.id)}
                  onBlurCapture={() => setHoveredRowId((current) => (current === s.id ? null : current))}
                  onClick={(event) => {
                    if (isEditing) return;
                    if ((event.target as HTMLElement).closest('button, input, select')) return;

                    const additiveSelection = event.metaKey || event.ctrlKey || event.shiftKey;
                    toggleStakeholderSelection(s.id, additiveSelection);
                  }}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#eef2ff' : undefined,
                    boxShadow: isSelected ? 'inset 3px 0 0 #4f46e5' : undefined,
                  }}
                >
                  <Td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        aria-label={`Select ${s.name || 'stakeholder'}`}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleStakeholderSelection(s.id, e.nativeEvent instanceof MouseEvent ? (e.nativeEvent as MouseEvent).metaKey || (e.nativeEvent as MouseEvent).ctrlKey || (e.nativeEvent as MouseEvent).shiftKey : false);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {isEditing ? (
                        <>
                          <div style={{ width: '100%' }}>
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
                          </div>
                        </>
                      ) : (
                        <div className="stakeholder-identity" style={{ width: '100%' }}>
                          <strong>{s.name || '—'}</strong>
                          <span>{s.role || '—'}</span>
                        </div>
                      )}
                    </div>
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
                      <select value={s.attitude} onChange={(e) => updateStakeholder(s.id, 'attitude', e.target.value)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                        {attitudeValues.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>{s.attitude}</span>
                    )}
                  </Td>

                  <Td>
                    <span className="stakeholder-status">
                      <CircleDot size={16} aria-hidden="true" />
                      {strategy}
                    </span>
                  </Td>

                  <Td style={{ whiteSpace: 'nowrap', width: '80px', minWidth: '80px', padding: '8px 6px', textAlign: 'center' }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          aria-label={`Save ${s.name || 'stakeholder'}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '30px',
                            height: '30px',
                            padding: 0,
                            border: '1px solid #2563eb',
                            borderRadius: '6px',
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeStakeholder(s.id)}
                          aria-label={`Delete ${s.name || 'stakeholder'}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '30px',
                            height: '30px',
                            padding: 0,
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: hoveredRowId === s.id ? 1 : 0,
                          transition: 'opacity 0.15s ease',
                          pointerEvents: hoveredRowId === s.id ? 'auto' : 'none',
                        }}
                        className="row-actions"
                      >
                        <button
                          type="button"
                          onClick={() => setEditingId(s.id)}
                          aria-label={`Edit ${s.name || 'stakeholder'}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '30px',
                            height: '30px',
                            padding: 0,
                            border: '1px solid transparent',
                            borderRadius: '6px',
                            backgroundColor: 'transparent',
                            color: '#4f46e5',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#eef2ff';
                            e.currentTarget.style.borderColor = '#c7d2fe';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.backgroundColor = '#eef2ff';
                            e.currentTarget.style.borderColor = '#c7d2fe';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeStakeholder(s.id)}
                          aria-label={`Delete ${s.name || 'stakeholder'}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '30px',
                            height: '30px',
                            padding: 0,
                            border: '1px solid transparent',
                            borderRadius: '6px',
                            backgroundColor: 'transparent',
                            color: '#ef4444',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fef2f2';
                            e.currentTarget.style.borderColor = '#fecaca';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.backgroundColor = '#fef2f2';
                            e.currentTarget.style.borderColor = '#fecaca';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
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
