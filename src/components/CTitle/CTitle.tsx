import "./CTitle.css";

interface CTitleProps {
  text: string;
  size?: '30' | '36' | '48' | '64' | '100' | '300';
  color?: 'default' | 'gray';
}

export const CTitle = ({
  text,
  size = '100',
  color = 'default',
}: CTitleProps) => {
  return (
    <div className={`text-${size} color-${color} custom-title`}>
      {text}
    </div>
  );
};
