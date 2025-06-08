import "./AnimatedBlock.css";
import {useEffect, useState, type ReactNode} from 'react';

type Direction = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface AnimatedBlockProps {
  visible: boolean;
  direction?: Direction;
  children: ReactNode;
  className?: string;
  hideWithoutUnmount?: boolean;
}

export default function AnimatedBlock({
  visible = false,
  direction = 'bottom',
  children,
  className = '',
  hideWithoutUnmount = false,
}: AnimatedBlockProps) {
  const [shouldRender, setShouldRender] = useState(visible);
  const [animationClass, setAnimationClass] = useState('');

  const handleAnimationEnd = () => {
    if (!visible && !hideWithoutUnmount) {
      setShouldRender(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setAnimationClass(`slide-in-${direction}`);
    } else {
      setAnimationClass(`slide-out-${direction}`);
    }
  }, [visible, direction]);

  return (
    <div
      className={`animated-block blur-bg ${animationClass} position-${direction} ${className}`}
      style={{display: shouldRender || hideWithoutUnmount ? 'block' : 'none'}}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  )
}
