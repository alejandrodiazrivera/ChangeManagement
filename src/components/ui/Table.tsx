import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return <div className={`table-wrap ${className}`}><table>{children}</table></div>;
};

export const Thead: React.FC<{ children: React.ReactNode }> = ({ children }) => <thead>{children}</thead>;
export const Tbody: React.FC<{ children: React.ReactNode }> = ({ children }) => <tbody>{children}</tbody>;
export const Tr: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => <tr className={className}>{children}</tr>;
export const Th: React.FC<{ children: React.ReactNode }> = ({ children }) => <th>{children}</th>;
export const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => <td>{children}</td>;