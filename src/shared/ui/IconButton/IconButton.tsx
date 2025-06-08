// Icon List: https://icons.getbootstrap.com/#icons
import './IconButton.css';

interface IconButtonProps {
  text?: string;
  iconId?: string;
  variant?: 'base'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'alpha';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function IconButton({
  text,
  iconId,
  variant,
  type = 'button',
  onClick,
  disabled = false,
  className,
  ...rest
}: IconButtonProps) {

  return (
    <button
      className={`icon-button pointer b-radius blur-bg d-flex align-c ${text && 'px-1'} ${className} ${
        !variant
          ? 'p-0'
          : `icon-button-color-${variant}`
      }`}
      {...rest}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {
        iconId &&
          <i className={`bi-${iconId} icon-button__icon`} />
      }
      {text}
    </button>
  )
}
