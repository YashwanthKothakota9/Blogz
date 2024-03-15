import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Accepts any valid React children (text, elements, etc.)
  bgColor?: string; // Custom background color classes
  textColor?: string; // Custom text color classes
  className?: string; // Additional CSS classes for customization
}

const Button = ({
  children,
  bgColor = 'bg-apple-500',
  textColor = 'text-white',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg hover:bg-apple-600 active:bg-apple-700 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
