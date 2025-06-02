import "./AnimatedBlock.css"
import React, {useEffect, useState} from 'react';

type Direction = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface AnimatedBlockProps {
  visible: boolean;
  direction?: Direction;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedBlock({
  visible,
  direction = 'bottom',
  children,
  className = '',
}: AnimatedBlockProps) {
  const [shouldRender, setShouldRender] = useState(visible);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setAnimationClass(`slide-in-${direction}`);
    } else {
      setAnimationClass(`slide-out-${direction}`);
    }
  }, [visible, direction]);

  const handleAnimationEnd = () => {
    if (!visible) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`animated-block blur-bg ${animationClass} position-${direction} ${className}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
}
