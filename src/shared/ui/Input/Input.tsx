import './Input.css';
import {forwardRef, type KeyboardEvent, type Ref} from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  iconId?: string;
  colon?: boolean;
  disabled?: boolean;
  className?: string;
};

function InputComponent(
  {
    value,
    onChange,
    onKeyDown,
    placeholder = '',
    type = 'text',
    required = false,
    iconId,
    colon = false,
    disabled = false,
    className,
  }: InputProps,
  ref: Ref<HTMLInputElement>
) {

  return (
    <div className={`input relative d-flex align-c ${className}`}>
      {
        iconId && (
          <i className={`bi bi-${iconId} ${colon && 'd-flex'}`}>
            {colon && ':'}
          </i>
        )
      }
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => onKeyDown?.(event)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

const Input = forwardRef(InputComponent);

export default Input;
