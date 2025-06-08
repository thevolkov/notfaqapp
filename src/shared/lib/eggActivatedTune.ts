import medShot from '../assets/sounds/medshot.mp3';

let audio: HTMLAudioElement | null = null;

export default function eggActivatedTune(active: boolean) {
  if (!active) return;
  if (!audio) audio = new Audio(medShot);
  else audio.currentTime = 0;

  audio.play().catch((err) => {
    console.warn('Sound playback failed:', err);
  });
};
