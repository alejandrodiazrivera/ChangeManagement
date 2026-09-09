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
type TrProps = React.HTMLAttributes<HTMLTableRowElement>;

export const Tr = React.forwardRef<HTMLTableRowElement, TrProps>(({ children, className = '', ...props }, ref) => (
  <tr ref={ref} className={className} {...props}>{children}</tr>
));

Tr.displayName = 'Tr';

export const Th: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, ...props }) => (
  <th {...props}>{children}</th>
);
export const Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, ...props }) => (
  <td {...props}>{children}</td>
);