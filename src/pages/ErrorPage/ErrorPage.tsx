import './ErrorPage.css';
import {useEffect, useRef, useState} from 'react';
import {Title} from '../../shared/ui';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function useGlitchEffect(
  originalText: string,
  baseInterval: number = 1000,
  duration: number = 300
) {
  const [displayedText, setDisplayedText] = useState(originalText);
  const textRef = useRef(originalText);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isGlitchingRef = useRef(false);

  useEffect(() => {
    textRef.current = originalText;
    setDisplayedText(originalText);
  }, [originalText]);

  useEffect(() => {
    const startDelay = Math.random() * baseInterval;

    timeoutIdRef.current = setTimeout(() => {
      intervalIdRef.current = setInterval(() => {
        if (isGlitchingRef.current) return;
        isGlitchingRef.current = true;

        const textArray = textRef.current.split('');
        let index = Math.floor(Math.random() * textArray.length);
        while (textArray[index] === ' ') {
          index = Math.floor(Math.random() * textArray.length);
        }

        const originalChar = textArray[index];
        setDisplayedText((prev) => {
          const newTextArray = prev.split('');
          newTextArray[index] = randomChar();
          return newTextArray.join('');
        });

        timeoutIdRef.current = setTimeout(() => {
          setDisplayedText((prev) => {
            const revertArray = prev.split('');
            revertArray[index] = originalChar;
            return revertArray.join('');
          });
          isGlitchingRef.current = false;
        }, duration);
      }, baseInterval + (Math.random() * 400 - 200));
    }, startDelay);

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [baseInterval, duration]);

  return displayedText;
}

export default function ErrorPage() {
  const glitchTitle = useGlitchEffect('!#ERROR#666#!', 1800, 400);
  const glitchText1 = useGlitchEffect('Your account and wallet have been blocked️ ☠️', 2700, 500);
  const glitchText2 = useGlitchEffect('Wanna get unblocked? Send your seed phrase and a pic of your ID (driver’s license works too). You’ve got 7 days. Tick tock...', 2100, 400);
  const glitchCode = useGlitchEffect('STOP CODE: NOTFUNNY_EXCEPTION', 2400, 450);
  const glitchSolution = useGlitchEffect('If you’d like to know more, just scream and press F5.', 3000, 500);

  return (
    <div className="error-page loading">
      <div className="glitch">
        <div className="glitch__img"></div>
        <div className="glitch__img"></div>
        <div className="glitch__img"></div>
        <div className="glitch__img"></div>
        <div className="glitch__img"></div>
        <div className="glitch-content absolute d-flex flex-column justify-c align-c">
          <Title className="glitch-content-title-shadow absolute" text={glitchTitle} />
          <Title className="glitch-content-title" text={glitchTitle} size="xl" />
          <Title className="glitch-content-subtitle" text={glitchText1} size="m" />
          <div className="glitch-content-text">
            {glitchText2}
          </div>
          <div className="glitch-content-code">{glitchCode}</div>
          <div className="glitch-content-solution">{glitchSolution}</div>
        </div>
      </div>
    </div>
  );
}