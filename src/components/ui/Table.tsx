import React from 'react';

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`table-wrap ${className}`} {...props}>
      <table>{children}</table>
    </div>
  );
};

export const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, ...props }) => (
  <thead {...props}>{children}</thead>
);
export const Tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, ...props }) => (
  <tbody {...props}>{children}</tbody>
);
export const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className = '', ...props }) => (
  <tr className={className} {...props}>{children}</tr>
);
export const Th: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, ...props }) => (
  <th {...props}>{children}</th>
);
export const Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, ...props }) => (
  <td {...props}>{children}</td>
);