import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string; // Allow className as an optional prop
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
