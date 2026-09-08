import React from 'react';

type BadgeColor = 'red' | 'yellow' | 'green' | 'gray' | 'purple' | 'sky' | 'pink' | 'orange';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ color = 'gray', children, className = '', style, ...props }) => {
  return <span className={`badge ${color} ${className}`} style={style} {...props}>{children}</span>;
};