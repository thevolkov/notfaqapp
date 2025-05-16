import SvgIcon from './SvgIcon';
import './IconButton.css';

interface IconButtonProps {
  text?: string;
  iconId?: string;
  iconColor?: string;
  variant?: 'success' | 'warning' | 'danger' ;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  rotate?: boolean;
}

export default function IconButton({
  text,
  iconId,
  iconColor = 'white',
  variant,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  rotate = false,
}: IconButtonProps) {

  const getIconButtonClass = (variant?: string, text?: string) => {
    const classes = []

    if (!variant) {
      classes.push('p-0')
    } else {
      classes.push(`icon-button--${variant}`)
    }

    if (!text) {
      classes.push('icon-button--round')
    }

    return classes.join(' ')
  }

  return (
    <button
      className={`b-radius icon-button ${getIconButtonClass(variant, text)} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {iconId &&
          <SvgIcon
              id={iconId}
              color={iconColor}
              className={`icon-button__icon ${rotate && 'icon-button__icon--rotate'}`}
          />
      }
      {text}
    </button>
  );
}
