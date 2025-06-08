import './SvgIcon.css';
import svgSprite from '../../assets/icons/sprite.svg'

interface IconProps {
  id: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function SvgIcon({ id, size = 30, color = '', className = '' }: IconProps) {
  return (
    <svg
      className={`svg-icon ${className} ${color}`}
      width={size}
      height={size}
      style={color && !['success', 'warning', 'danger'].includes(color) ? { color } : {}}
    >
      <use href={`${svgSprite}#${id}`} />
    </svg>
  );
}
