import './ProjectPage.css';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {type RootState} from '../app/store';
import {useParams} from 'react-router-dom';
import IconButton from '../shared/ui/IconButton';
import {type Project} from '../entities/project/projectSlice';
import {useBackButton} from '../shared/lib';
import Title from '../shared/ui/Title';
import Faq from '../shared/ui/Faq';
import Lottie from 'lottie-react';
import {
  notcoin,
  stickerPack,
  dogs,
  earn,
  community,
  notPixel,
  voidGame,
} from '../shared/assets';

const lottie = {
  'Notcoin': notcoin,
  'Sticker Pack': stickerPack,
  'Dogs': dogs,
  'Earn': earn,
  'Community': community,
  'Not Pixel': notPixel,
  'Not Games': notcoin,
  'Void': voidGame,
}

const linksAlias = {
  telegram: 'telegram',
  community: 'chat-text',
  x: 'twitter-x',
  web: 'globe',
  support: 'headset',
}

export default function ProjectPage() {
  const {id} = useParams<{id: string}>();
  const project: Project | undefined = useSelector((state: RootState) =>
    state.projects.projects.find((project) => project.id === id))
  const {handleBack} = useBackButton();

  const [loop, setLoop] = useState(false);

  if (!project) return <Title text="Project not found ¯\_(ツ)_/¯" size="l" />;

  return (
    <div className="project-page">
      <div className="project-title">
        <Title text={project.title} size="4xl" shadow />
        <Lottie
          className={`lottie-icon ${project.title === 'Void' && 'filter-off'}`}
          animationData={lottie[project.title]}
          loop={loop}
          onMouseEnter={() => setLoop(true)}
          onMouseLeave={() => setLoop(false)}
        />
      </div>

      <img
        className="project-image b-radius"
        src={project.image}
        alt={project.title}
      />
      {project.desc}
      <div className="links">
        {
          Object.entries(project.links).map((link, index) => (
            link[1] && (
              <a
                className="b-radius bg-blur"
                key={index}
                href={link[1]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/*<SvgIcon id={link[0]} color="white" />*/}
                <i className={`bi bi-${linksAlias[link[0]]}`} />
              </a>
            )
          ))
        }
      </div>
      <Faq faqData={project.faq} />
      <IconButton
        iconId="arrow-90deg-left"
        text="Back"
        onClick={handleBack}
      />
    </div>
  );
}
