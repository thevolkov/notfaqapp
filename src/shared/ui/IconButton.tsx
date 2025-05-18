// Icon List: https://icons.getbootstrap.com/#icons
import './IconButton.css';

interface IconButtonProps {
  text?: string;
  iconId?: string;
  iconSize?: string;
  variant?: 'success' | 'warning' | 'danger' | 'light-alpha' | 'dark-alpha';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  rotate?: boolean;
}

export default function IconButton({
  text,
  iconId,
  iconSize,
  variant,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  rotate = false,
}: IconButtonProps) {

  const getIconButtonClass = (variant?: string, text?: string) => {
    const classes = []

    if (!variant) classes.push('p-0')
    else classes.push(`icon-button--${variant}`)

    if (!text) classes.push('icon-button--round')

    return classes.join(' ')
  }

  return (
    <button
      className={`b-radius icon-button ${getIconButtonClass(variant, text)} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {
        iconId &&
          <i style={{fontSize: `${iconSize}rem`}} className={`bi bi-${iconId} icon-button__icon ${rotate && 'icon-button__icon--rotate'}`} />
      }
      {text}
    </button>
  );
}
