import medshot from '../assets/sounds/medshot.mp3';

let audio: HTMLAudioElement | null = null;

export default function eggActivatedTune(active: boolean) {
  if (active) {
    if (!audio) {
      audio = new Audio(medshot);
    } else {
      audio.currentTime = 0;
    }
    audio.play().catch((err) => {
      console.warn('Sound playback failed:', err);
    });
  }
};
