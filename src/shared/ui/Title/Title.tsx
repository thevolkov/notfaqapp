import './Title.css';
import {useEffect, useState, type DragEvent} from 'react';

interface TitleProps {
  text?: string;
  size?: string;
  color?: string;
  subtitle?: string;
  shadow?: boolean;
  shadowText?: string;
  className?: string;
  draggable?: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Title({
  text = '',
  size = 'xl',
  subtitle,
  shadow,
  shadowText = '',
  className,
  draggable = false,
}: TitleProps) {
  const words = text.trim().split(/\s+/);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (draggable && words.length >= 2) {
      setShuffled(shuffleArray(words));
    }
  }, [text, draggable]);

  const handleDragStart = (index: number) =>
    (event: DragEvent) => {
      event.dataTransfer.setData('text/plain', index.toString());
    };

  const handleDrop = (targetIndex: number) =>
    (event: DragEvent) => {
      const sourceIndex = Number(event.dataTransfer.getData('text/plain'));
      const newOrder = [...shuffled];
      const [moved] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, moved);
      setShuffled(newOrder);

      if (newOrder.join(' ') === words.join(' ')) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className={`${className} title relative`}>
      {
        (draggable && words.length >= 2) ? (
          <div className={`title-size-${size} drag-title d-flex`}>
            {
              shuffled.map((word, index) => (
                <span
                  key={index}
                  draggable
                  onDragStart={handleDragStart(index)}
                  onDrop={handleDrop(index)}
                  onDragOver={handleDragOver}
                  className="draggable-word"
                >
                {word}
              </span>
              ))
            }
          </div>
        ) : (
          <div className={`title-size-${size}`}>
            {text}
          </div>
        )
      }

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
            {shadowText || text}
          </div>
        )
      }

      {
        isCorrect && (
          <div className="congrats-message">
            CORRECT!
          </div>
        )
      }
    </div>
  );
}
