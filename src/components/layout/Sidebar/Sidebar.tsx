import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/overview', icon: 'fa-chart-pie', label: 'Change Overview' },
  { path: '/stakeholders', icon: 'fa-users', label: 'Stakeholders' },
  { path: '/engagement', icon: 'fa-bullhorn', label: 'Engagement Strategy' },
  { path: '/impact', icon: 'fa-arrows-left-right', label: 'Change Impact' },
  { path: '/resistance', icon: 'fa-shield', label: 'Resistance' },
  { path: '/adkar', icon: 'fa-layer-group', label: 'ADKAR' },
  { path: '/register', icon: 'fa-clipboard-list', label: 'Resistance & Issue Register' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fas fa-arrow-trend-up"></i>
        <span>ChangeFlow</span>
      </div>
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <i className={`fas ${item.icon}`}></i>
          <span>{item.label}</span>
        </NavLink>
      ))}
      <div className="sidebar-footer">v3.0 · React + TS</div>
    </aside>
  );
};