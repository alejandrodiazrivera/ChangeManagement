import React, { useMemo } from 'react';
import { Communication, PeriodType } from '../../../types';
import { formatDate, getWeekStart, getMonthStart, getWeekNumber, formatDateFull } from '../../../utils/dateHelpers';

const stakeholderColors: Record<string, string> = {
  'Project Board': 'bar-purple',
  'Dev Team': 'bar-blue',
  'Client': 'bar-green',
  'Marketing': 'bar-pink',
  'QA Team': 'bar-orange',
  'External Partner': 'bar-sky',
};

interface GanttChartProps {
  communications: Communication[];
}

export const GanttChart: React.FC<GanttChartProps> = ({ communications }) => {
  const { periods, periodType } = useMemo<{ periods: Date[]; periodType: PeriodType }>(() => {
    if (communications.length === 0) {
      return { periods: [], periodType: 'day' };
    }

    const range = communications.reduce<[Date, Date] | null>((acc, c) => {
      const start = new Date(c.startDate + 'T00:00:00');
      const end = new Date(c.endDate + 'T00:00:00');

      if (!acc) {
        return [start, end];
      }

      return [start < acc[0] ? start : acc[0], end > acc[1] ? end : acc[1]];
    }, null);

    if (!range) {
      return { periods: [], periodType: 'day' };
    }

    const [minDate, maxDate] = range;
    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const periodsList: Date[] = [];
    let computedPeriodType: PeriodType = 'day';

    if (totalDays <= 45) {
      computedPeriodType = 'day';
      for (let dt = new Date(minDate); dt <= maxDate; dt.setDate(dt.getDate() + 1)) {
        periodsList.push(new Date(dt));
      }
    } else if (totalDays <= 180) {
      computedPeriodType = 'week';
      let start = getWeekStart(minDate);
      while (start <= maxDate) {
        periodsList.push(new Date(start));
        start.setDate(start.getDate() + 7);
      }
    } else {
      computedPeriodType = 'month';
      let start = getMonthStart(minDate);
      while (start <= maxDate) {
        periodsList.push(new Date(start));
        start.setMonth(start.getMonth() + 1);
      }
    }

    return { periods: periodsList, periodType: computedPeriodType };
  }, [communications]);

  if (communications.length === 0 || periods.length === 0) {
    return <div className="empty-gantt">Add communications to see them on the timeline.</div>;
  }

  const colCount = periods.length + 1;
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `180px repeat(${periods.length}, 1fr)`,
    gridTemplateRows: `auto repeat(${communications.length}, 44px)`,
  };

  return (
    <div className="gantt-grid" style={gridStyle}>
      {/* Header */}
      <div className="gantt-header" style={{ gridColumn: '1', gridRow: '1' }}>Activity</div>
      {periods.map((p, idx) => {
        let label = '';
        if (periodType === 'day') label = formatDate(p);
        else if (periodType === 'week') label = 'W' + getWeekNumber(p) + '\n' + formatDate(p);
        else label = p.toLocaleString('default', { month: 'short' }) + ' ' + p.getFullYear();
        return (
          <div key={idx} className="gantt-header" style={{ gridColumn: idx + 2, gridRow: '1' }}>
            {label}
          </div>
        );
      })}

      {/* Rows */}
      {communications.map((c, rowIdx) => {
        const row = rowIdx + 2;
        const commStart = new Date(c.startDate + 'T00:00:00');
        const commEnd = new Date(c.endDate + 'T00:00:00');
        let startIdx = 0, endIdx = 0;
        for (let i = 0; i < periods.length; i++) {
          const pStart = periods[i];
          let pEnd;
          if (i < periods.length - 1) {
            pEnd = new Date(periods[i + 1]);
            pEnd.setDate(pEnd.getDate() - 1);
          } else {
            pEnd = new Date(periods[periods.length - 1]);
            pEnd.setDate(pEnd.getDate() + 7); // extend last period
          }
          if (commStart <= pEnd && commStart >= pStart) startIdx = i;
          if (commEnd >= pStart && commEnd <= pEnd) endIdx = i;
          if (i === periods.length - 1 && commEnd >= pStart) endIdx = i;
        }
        if (startIdx > endIdx) [startIdx, endIdx] = [endIdx, startIdx];

        const colorClass = stakeholderColors[c.stakeholder] || 'bar-gray';
        const startCol = startIdx + 2;
        const endCol = endIdx + 3;

        return (
          <React.Fragment key={c.id}>
            <div className="gantt-row-label" style={{ gridColumn: '1', gridRow: row }}>
              {c.message.length > 24 ? c.message.slice(0, 22) + '…' : c.message}
            </div>
            <div className={`gantt-bar ${colorClass}`} style={{ gridColumn: `${startCol} / ${endCol}`, gridRow: row }}>
              {c.time}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};