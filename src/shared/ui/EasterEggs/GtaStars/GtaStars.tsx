import './GtaStars.css';
import {useEffect, useState} from 'react';
import ahShit from './ah-shit.mp3';
import siren from './siren.mp3';

export const GtaStars = ({active}: {active: boolean}) => {
  const [solid, setSolid] = useState(false);

  const createAudio = (src: string, volume = 0.25): HTMLAudioElement => {
    const audio = new Audio(src);
    audio.volume = volume;
    return audio;
  };

  useEffect(() => {
    if (!active) {
      setSolid(false);
      return;
    }

    new Audio(ahShit).play();
    createAudio(siren).play();

    const timer = setTimeout(() => setSolid(true), 13000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className={`gta-stars ${active ? 'active' : ''} ${solid ? 'solid' : ''} absolute`}>
      <span>★★★★★★</span>
    </div>
  );
};
