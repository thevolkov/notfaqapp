import './Title.css';

interface TitleProps {
  text?: string;
  size?: string;
  color?: string;
  subtitle?: string;
  shadow?: boolean;
  shadowText?: string;
  className?: string;
}

export default function Title({
  text = '',
  size = 'xl',
  subtitle,
  shadow,
  shadowText = '',
  className,
}: TitleProps) {

  return (
    <div className={`${className} title relative`}>
      <div className={`title-size-${size}`}>
        {text}
      </div>
      {
        subtitle && (
          <div className="subtitle absolute">
            {subtitle}
          </div>
        )
      }
      {
        shadow && (
          <div className="title-shadow absolute">
            {
              shadowText
                ? shadowText
                : text
            }
          </div>
        )}
    </div>
  );
}
