import './SvgIcon.css';

interface IconProps {
  id: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function SvgIcon({ id, size = 24, color = '', className = '' }: IconProps) {
  return (
    <svg
      className={`svg-icon ${className} ${color}`}
      width={size}
      height={size}
      style={color && !['white', 'success', 'warning', 'danger'].includes(color) ? { color } : {}}
    >
      <use href={`/src/shared/assets/icons/sprite.svg#${id}`} />
    </svg>
  );
}
