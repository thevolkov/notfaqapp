import './Textarea.css';
import {useEffect, useRef} from 'react';

type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  className?: string;
  iconId?: string;
};

const textareaHeightAutoResize = (el: HTMLTextAreaElement) => {
  if (!el) return;

  el.style.height = 'auto';
  const maxHeight = 250;

  if (el.scrollHeight < maxHeight) {
    el.style.height = `${el.scrollHeight}px`;
  } else {
    el.style.height = `${maxHeight}px`;
  }
};

export default function Textarea({
  value,
  onChange,
  placeholder = '',
  required = false,
  name,
  className,
  iconId,
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaHeightAutoResize(textareaRef.current);
    }
  }, [value]);

  return (
    <div className="textarea">
      {
        iconId && (
          <i className={`bi bi-${iconId}`} />
        )
      }
      <textarea
        ref={textareaRef}
        value={value}
        onInput={() => {
          if (textareaRef.current) {
            textareaHeightAutoResize(textareaRef.current);
          }
        }}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        name={name}
        className={className}
      />
    </div>
  );
}
