import "./AnimatedBlock.css"
import React, {useEffect, useState} from 'react';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface AnimatedBlockProps {
  visible: boolean;
  direction?: Direction;
  children: React.ReactNode;
  className?: string;
  // preserveMount?: boolean;
  // position?: string | undefined;
}

export default function AnimatedBlock({
  visible,
  direction = 'bottom',
  children,
  className = '',
  // preserveMount = false,
  // position = '',
}: AnimatedBlockProps) {
  const [shouldRender, setShouldRender] = useState(visible);
  const [animationClass, setAnimationClass] = useState('');
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsHiding(false);
      setAnimationClass(`slide-in-${direction}`);
    } else {
      // if (preserveMount) {
      //   setIsHiding(true);
      //   setAnimationClass(`slide-out-${direction}`);
      // } else {
        setAnimationClass(`slide-out-${direction}`);
      }
    // }
  }, [visible, direction]);

  const handleAnimationEnd = () => {
    if (!visible) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`slide b-radius blur-bg ${animationClass} ${className}`}
      onAnimationEnd={handleAnimationEnd}
      style={{
        // position: position ? position : '',
        visibility: isHiding ? 'hidden' : 'visible',
        pointerEvents: isHiding ? 'none' : 'auto',
      }}
    >
      {children}
    </div>
  );
}
