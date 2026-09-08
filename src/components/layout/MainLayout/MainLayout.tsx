import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar/TopBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <TopBar />
        <div className="workspace">
          {children}
        </div>
      </main>
    </div>
  );
};