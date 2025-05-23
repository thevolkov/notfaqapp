import './Input.css';
import {forwardRef, type KeyboardEvent} from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  name?: string;
  className?: string;
  iconId?: string;
  colon?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      onKeyDown,
      placeholder = '',
      type = 'text',
      required = false,
      name,
      className,
      iconId,
      colon = false,
    },
    ref
  ) => {
    return (
      <div className={`input ${className}`}>
        {
          iconId &&
            <i className={`bi bi-${iconId} ${colon && 'd-flex'}`}>
              {colon && ':'}
            </i>}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => onKeyDown?.(e)}
          placeholder={placeholder}
          required={required}
          name={name}
          className={className}
        />
      </div>
    );
  }
);

export default Input;
