import './NotRocket.css'
import Rocket from '../../../assets/imgs/notRock.png';
import {useEffect} from 'react';

interface NotRocketProps {
  rocketLaunch: boolean;
  onClick: () => void;
}

export default function NotRocket({rocketLaunch, onClick}: NotRocketProps) {

  useEffect(() => {
    const contentEl = document.querySelector('.content') as HTMLElement | null;

    if (!contentEl) return;

    if (rocketLaunch) {
      contentEl.classList.add('animate-bg');
    } else {
      contentEl.classList.remove('animate-bg');
    }

    return () => contentEl.classList.remove('animate-bg');
  }, [rocketLaunch]);


  return (
    <div className={`not-rocket ${rocketLaunch ? 'launch' : ''}`} onClick={onClick}>
      <img
        className="not-rocket-shake"
        src={Rocket}
        alt="Rocket"
      />
    </div>
  )
}
