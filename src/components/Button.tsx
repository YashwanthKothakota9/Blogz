import React from 'react';

interface ButtonProps {
  children: React.ReactNode; // Accepts any valid React children (text, elements, etc.)
  //type?: 'button' | 'submit' | 'reset'; // Common button types (default to "button")
  bgColor?: string; // Custom background color classes
  textColor?: string; // Custom text color classes
  className?: string; // Additional CSS classes for customization
  props: React.ButtonHTMLAttributes<HTMLButtonElement>; // Other standard button props
}

const Button = ({
  children,
  //type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
