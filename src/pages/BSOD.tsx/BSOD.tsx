import './BSOD.css'
import squidWork from '../../shared/assets/tgs/squidWork.json'
import Lottie from 'lottie-react';

export default function BSOD() {
  return (
    <div className="bsod">
      <div className="bsod-content">
        <div className="bsod-emoji d-flex">
          <Lottie className="squid-work" animationData={squidWork} />
        </div>
        <div className="bsod-title">!#ERROR#666#!</div>
        <div className="bsod-error">Something went wrong. We’re totally investigating the issue and reviewing all logs
          to prevent this from happening again. <strong>Absolutely. Promise.</strong><em>(Nope ¯\_(ツ)_/¯)</em></div>
        <div className="bsod-code">STOP CODE: NOTFUNNY_EXCEPTION</div>
        <div className="bsod-solution">
          If you’d like to know more, just scream into the void or press F5.
        </div>
      </div>
    </div>
  )
}
