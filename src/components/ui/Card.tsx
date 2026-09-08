import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style, ...props }) => {
  return <div className={`card ${className}`} style={style} {...props}>{children}</div>;
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '', style, ...props }) => {
  return <div className={`card-header ${className}`} style={style} {...props}>{children}</div>;
};