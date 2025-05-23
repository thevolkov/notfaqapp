import './ToastyEasterEgg.css';
import { useEffect, useState, useRef } from 'react';
import toastImg from './toasty.gif';
import toastSound from './toasty.mp3';

const keySequence = ['a', 'c', 'ArrowUp', 'b', 'ArrowUp', 'b', 'a', 'ArrowDown'];

export default function ToastyEasterEgg () {
  const [visible, setVisible] = useState(false);
  const keysPressed = useRef<string[]>([]);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }

      keysPressed.current.push(e.key);
      if (keysPressed.current.length > keySequence.length) {
        keysPressed.current.shift();
      }

      if (JSON.stringify(keysPressed.current) === JSON.stringify(keySequence)) {
        setVisible(true);
        new Audio(toastSound).play();

        timeoutRef.current = window.setTimeout(() => {
          setVisible(false);
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`toasty-container ${visible ? 'show' : ''}`}>
      <img src={toastImg} alt="Toasty!" />
    </div>
  );
}
