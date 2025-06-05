import './CSBomb.css'
import {useEffect} from 'react';
import Bomb from './cs-bomb.webm';
import BombHVC from './cs-bomb.mp4';
import c4Plant from './sounds/c4_plant.mp3'
import bombPl from './sounds/bombpl.mp3'
import c4Beep from './sounds/c4_beep1.mp3'
import c4Disarm from './sounds/c4_disarm.mp3'
import bombDef from './sounds/bombdef.mp3'

export default function CSBomb({
  active = false,
  onEnd
}: {
  active: boolean;
  onEnd?: () => void;
}) {

  const createAudio = (src: string, volume = 0.5): HTMLAudioElement => {
    const audio = new Audio(src);
    audio.volume = volume;
    return audio;
  };

  useEffect(() => {
    if (active) {
      const audio1 = createAudio(c4Plant);
      const audio2 = createAudio(bombPl);
      const audio3 = createAudio(c4Beep);
      const audio4 = createAudio(c4Disarm);
      const audio5 = createAudio(bombDef);

      audio1.play();
      audio2.play();

      audio1.addEventListener('ended', () => {
        const beepInterval = 850;
        const beepDuration = 10000;
        const totalBeeps = Math.floor(beepDuration / beepInterval);

        let count = 0;

        const interval = setInterval(() => {
          if (count >= totalBeeps) {
            clearInterval(interval);

            audio4.play();
            audio5.play();
            onEnd?.();
            return;
          }

          const beep = audio3.cloneNode() as HTMLAudioElement;
          beep.volume = 0.5;
          beep.play();

          count++;
        }, beepInterval);
      });
    }
  }, [active]);

  return (
    <div className="cs-bomb absolute">
      <video
        className="relative"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={BombHVC} type='video/mp4;codecs=hvc1' />
        <source src={Bomb} type="video/webm" />
      </video>
    </div>
  )
}
