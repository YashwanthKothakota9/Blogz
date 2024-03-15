import React, { useId } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`px-3 py-2 rounded-lg bg-apple-50 text-apple-950 outline-none focus:bg-white duration-200 border border-apple-500 w-full ${className}`}
        type={type}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
