import './Toasty.css';
import {useEffect, useState, useRef} from 'react';
import toastImg from './toasty.gif';
import toastSound from './toasty.mp3';

const keySequence = ['a', 'c', 'ArrowUp', 'b', 'ArrowUp', 'b', 'a', 'ArrowDown'];

export default function Toasty () {
  const [visible, setVisible] = useState(false);
  const keysPressed = useRef<string[]>([]);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
      }

      keysPressed.current.push(event.key);
      if (keysPressed.current.length > keySequence.length) {
        keysPressed.current.shift();
      }

      if (JSON.stringify(keysPressed.current) === JSON.stringify(keySequence)) {
        new Audio(toastSound).play().then(() => setVisible(true));

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
