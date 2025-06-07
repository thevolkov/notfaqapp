import './MemesGalleryPage.css';
import {useEffect, useState} from 'react';
import Title from '../../shared/ui/Title/Title';
import shuffleArray from '../../shared/lib/shuffleArray';
import rabbit from '../../shared/assets/tgs/thinkingRabbit.json';
import Lottie from 'lottie-react';

interface MemesGalleryPageProps {
  images?: string[];
}

// const CDN = import.meta.env.VITE_CDN_BASE_URL;
const CDN = 'https://s3.ru1.storage.beget.cloud/f99497af8d68-imaginative-elder';
const totalMemes = 35;

const defaultImages = Array.from({length: totalMemes}, (_, i) => (
  `${CDN}/memes/mm-${i + 1}.jpg`
));

// const preloadImages = (sources: string[]) => {
//   return Promise.all(
//     sources.map(
//       (src) =>
//         new Promise((resolve) => {
//           const img = new Image();
//           img.src = src;
//           img.onload = () => resolve(src);
//           img.onerror = () => resolve(src);
//         })
//     )
//   );
// };

export default function MemesGalleryPage({images = defaultImages}: MemesGalleryPageProps) {
  const [shuffledImages, setShuffledImages] = useState<string[] | null>(null);

  useEffect(() => {
    const shuffled = shuffleArray(images);
    //
    // preloadImages(shuffled).then(() => {
    // });
    setShuffledImages(shuffled);

  }, [images]);

  return (
    <div className="memes-gallery-page d-flex flex-column">
      <div>
        <Title text="not memes" size="2xl" shadow />
        <Title className="transcription relative" text="[nɒt miːmz]" size="s" />
      </div>
      {
        shuffledImages === null ? (
          <div className="d-flex align-c">
            <Lottie
              style={{maxWidth: '2rem'}}
              animationData={rabbit}
              autoplay={true}
              loop={true}
            /> <div>Loading <span className="pending-ellipsis" /></div>
          </div>
        ) : (
          <div className="masonry-grid">
            {
              shuffledImages.map((src, index) => (
                <div className="masonry-item-wrapper b-radius" key={index}>
                  <img
                    className="masonry-item"
                    src={src}
                    alt={`img-${index}`}
                    loading="lazy"
                  />
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}
