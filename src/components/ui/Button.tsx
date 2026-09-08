import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'success' | 'danger' | 'ai';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  const base = 'btn';
  const variantMap = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    success: 'btn-success',
    danger: 'btn-danger',
    ai: 'btn-ai',
  };
  const sizeMap = { sm: 'btn-sm', md: '' };
  return (
    <button className={`${base} ${variantMap[variant]} ${sizeMap[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
