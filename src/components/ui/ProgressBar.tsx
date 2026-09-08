import React from 'react';

interface ProgressBarProps {
  value: number; // 0–100
  label?: string;
  showValue?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, showValue = true }) => {
  return (
    <div className="metric">
      <div className="metric-top">
        <span>{label}</span>
        {showValue && <strong>{value}%</strong>}
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${Math.min(100, Math.max(0, value))}%` }}></div>
      </div>
    </div>
  );
};