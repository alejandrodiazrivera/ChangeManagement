import React, { createContext, useContext, useState, useCallback } from 'react';

interface ToastContextValue {
  showToast: (msg: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMessage(msg);
    setVisible(true);
    timeoutRef.current = setTimeout(() => setVisible(false), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`toast ${visible ? 'show' : ''}`}>
        <i className="fas fa-check-circle"></i>
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};