import './MemesGalleryPage.css';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../app/store';
import {Title} from '../../shared/ui/';
import Lottie from 'lottie-react';
import shuffleArray from '../../shared/lib/shuffleArray';
import {rabbit, notcoinMeme} from '../../shared/assets/';
import punkSkin from '../../shared/assets/imgs/skin-punks.png';
import canFix from '../../shared/assets/imgs/fixThat.png';

interface MemesGalleryPageProps {
  images?: string[];
}

const CDN = import.meta.env.VITE_CDN_BASE_URL;
const totalMemes = 105;

const defaultImages = Array.from({length: totalMemes}, (_, i) => (
  `${CDN}/memes/mm-${i + 1}.jpg`
));

const preloadImages = (sources: string[]) => {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = () => resolve(src);
        })
    )
  );
};

export default function MemesGalleryPage({images = defaultImages}: MemesGalleryPageProps) {
  const showVouchers = useAppSelector((state) => state.console.vouchers);
  const [shuffledImages, setShuffledImages] = useState<string[] | null>(null);

  const titleText = showVouchers ? 'voucher' : 'not memes';
  const transcriptionText = showVouchers ? '[ˈvaʊʧə]' : '[nɒt miːmz]';

  useEffect(() => {
    const shuffled = shuffleArray(images);

    preloadImages(shuffled).then(() => {
      setShuffledImages(shuffled);
    });
  }, [images]);

  return (
    <div className="memes-gallery-page d-flex flex-column">
      <div>
        <div className="d-flex align-s">
          <Title text={titleText} size="2xl" shadow />
          {
            showVouchers ? (
              <div className="relative">
                <img
                  style={{maxWidth: '3rem', left: '2rem', bottom: '2rem'}}
                  className="absolute visible" src={canFix}
                  alt="fix that"
                />
                <img style={{maxWidth: '2.5rem'}} src={punkSkin} alt="punk skin" />
              </div>
            ) : (
              <Lottie
                style={{maxWidth: '2rem'}}
                animationData={notcoinMeme}
                loop={true}
              />
            )
          }
        </div>
        <Title className="transcription relative" text={transcriptionText} size="s" />
      </div>
      {
        shuffledImages === null ? (
          <div className="d-flex align-c">
            <Lottie
              style={{maxWidth: '2rem'}}
              animationData={rabbit}
              loop={true}
            />
            <div>Loading <span className="pending-ellipsis" /></div>
          </div>
        ) : (
          <div className="masonry-grid">
            {
              shuffledImages.map((src, index) => (
                <img
                  className="masonry-item b-radius"
                  src={showVouchers ? `${import.meta.env.BASE_URL}imgs/projects/voucher.jpg` : src}
                  alt={`img-${index}`}
                  key={index}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}
