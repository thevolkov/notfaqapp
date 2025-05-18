import { useEffect, useRef, useState } from 'react';
import './Title.css';

interface TitleProps {
  text?: string;
  size?: string;
  color?: string;
  subtitle?: string;
  shadow?: boolean;
}

export default function Title({ text = '', size = 'l', color = '', subtitle, shadow }: TitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      const textEl = textRef.current;

      if (container && textEl) {
        const containerWidth = container.offsetWidth;
        const textWidth = textEl.scrollWidth;

        if (textWidth > containerWidth) {
          const ratio = containerWidth / textWidth;
          setScale(Math.max(ratio * 0.95, 0.7));
        } else {
          setScale(1);
        }
      }
    };

    resize();

    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [text]);

  return (
    <div className="title" ref={containerRef}>
      <div
        ref={textRef}
        className={`title-${size} ${color}`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}
      >
        {text}
      </div>
      {subtitle && <div className="title-s">{subtitle}</div>}
      {shadow && <div className="title-huge">{text}</div>}
    </div>
  );
}
