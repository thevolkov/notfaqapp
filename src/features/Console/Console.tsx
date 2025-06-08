import './Console.css';
import {useEffect, useRef} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/store';
import {setInput, executeCommand} from '../../entities/console/consoleSlice';
import {Input} from '../../shared/ui/';

interface ConsoleProps {
  showConsole: boolean;
}

export default function Console({showConsole}: ConsoleProps) {
  const dispatch = useAppDispatch();
  const consoleRef = useRef<HTMLInputElement>(null);
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  const {logs, input, pending} = useAppSelector((state) => state.console);

  const handleConsoleEnter = () => {
    if (input.trim()) {
      dispatch(executeCommand(input));
    }
  };

  useEffect(() => {
    if (showConsole) {
      const footer = document.querySelector('.footer') as HTMLElement | null;
      footer?.classList.add('footer-none');

      dispatch(setInput(''));
      const timeout = setTimeout(() => {
        consoleRef.current?.focus();
      }, 50);
      return () => {
        footer?.classList.remove('footer-none');
        clearTimeout(timeout);
      }
    } else {
      consoleRef.current?.blur();
    }
  }, [showConsole]);

  useEffect(() => {
    if (!showConsole || !consoleOutputRef.current) return;
    consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight;
  }, [showConsole, logs]);

  return (
    <div className="console matrix d-flex flex-column">
      <div className="console-output d-flex justify-sb flex-column" ref={consoleOutputRef}>
        {
          logs.map((output, index, arr) => (
            <div className="console-log d-flex" key={index}>
              {output}
              {
                pending && index === arr.length - 1 && (
                  <>{'>>> pending'}<span className="pending-ellipsis" /></>
                )
              }
            </div>
          ))
        }
      </div>
      <Input
        ref={consoleRef}
        iconId="code-slash"
        value={input}
        onChange={(value) => dispatch(setInput(value))}
        onKeyDown={(event) =>
          event.key === 'Enter' && handleConsoleEnter()}
        colon
      />
    </div>
  )
}
