import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

const navItems = [
  { path: '/overview', icon: 'fa-chart-pie', label: 'Change Overview' },
  { path: '/stakeholders', icon: 'fa-users', label: 'Stakeholders' },
  { path: '/engagement', icon: 'fa-bullhorn', label: 'Engagement Strategy' },
  { path: '/impact', icon: 'fa-arrows-left-right', label: 'Change Impact' },
  { path: '/resistance', icon: 'fa-shield', label: 'Resistance' },
  { path: '/adkar', icon: 'fa-layer-group', label: 'ADKAR' },
  { path: '/register', icon: 'fa-clipboard-list', label: 'Resistance & Issue Register' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="logo">
        <i className="fas fa-arrow-trend-up"></i>
        <span>ChangeFlow</span>
        <button className="sidebar-close" type="button" aria-label="Close navigation" onClick={onClose}>
          <X size={18} />
        </button>
      </div>
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
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