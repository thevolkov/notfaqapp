import './ProjectPage.css';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {type RootState} from '../../app/store';
import {useNavigate, useParams} from 'react-router-dom';
import IconButton from '../../shared/ui/IconButton/IconButton';
import {type Project} from '../../entities/project/projectSlice';
import {useBackButton} from '../../shared/lib';
import Title from '../../shared/ui/Title/Title';
import Faq from '../../shared/ui/Faq/Faq';
import {linksAlias} from '../../shared/constants';
import Rocket from '../../shared/assets/imgs/notRock.png';
import {ToastyEasterEgg} from '../../shared/ui';
import {getProjectImageSrc} from '../../shared/lib/imageHelpers';
import Lottie from 'lottie-react';
import Notcoin from '../../shared/assets/tgs/notcoin.json';
import Community from '../../shared/assets/tgs/community.json';
import Dogs from '../../shared/assets/tgs/dogs.json';
import NotPixel from '../../shared/assets/tgs/notPixel.json';
import Earn from '../../shared/assets/tgs/earn.json';
import StickerPack from '../../shared/assets/tgs/stickerPack.json';

export default function ProjectPage() {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const {handleBack} = useBackButton();
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunch, setRocketLaunch] = useState(false);
  const [projectImage, setProjectImage] = useState('');

  const project: Project | undefined = useSelector((state: RootState) =>
    state.projects.projects.find((project) => project.id === id))

  const handleChangeImage = () => {
    setProjectImage(project?.image || '')
  }

  const handleRocketLaunch = () => {
    setRocketLaunch(true);

    const contentEl = document.querySelector('.content') as HTMLElement | null;

    if (contentEl) {
      contentEl.classList.add('animate-bg');

      setTimeout(() => {
        handleChangeImage();
        contentEl.classList.remove('animate-bg');
      }, 5000);
    }
  };

  useEffect(() => {
    const contentEl = document.querySelector('.content') as HTMLElement | null;

    return () => {
      if (contentEl) {
        contentEl.classList.remove('animate-bg');
      }
    };
  }, [])

  useEffect(() => {
    handleChangeImage()

    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const parts = id.split('-');
      const lastPart = parts[parts.length - 1];
      if (!isNaN(Number(lastPart))) {
        setHighlightId(lastPart);
      } else {
        setHighlightId(null);
      }

      const element = document.getElementById(id);
      if (element) element.scrollIntoView({behavior: 'smooth'});
    }
  }, [project]);

  useEffect(() => {
    if (project?.title.toLowerCase() === 'notcoin' && rocketLaunch) {
      setProjectImage('/imgs/projects/Notcoin-Game.jpg')
    }
  }, [project?.title, rocketLaunch])

  if (!project) {
    return <Title text="Project not found ¯\_(ツ)_/¯" size="xl" />;
  }

  return (
    <>
      <div className="project-title d-inline-flex align-c">
        <Title text={project.title} size="2xl" shadow />
        <Lottie className="lottie-icon" animationData={Notcoin} loop />
        <Lottie className="lottie-icon" animationData={Community} loop />
        <Lottie className="lottie-icon" animationData={Dogs} loop />
        <Lottie className="lottie-icon" animationData={NotPixel} loop />
        <Lottie className="lottie-icon" animationData={Earn} loop />
        <Lottie className="lottie-icon" animationData={StickerPack} loop />
      </div>
      <div className="project-page">
        <div className="project-desc">
          <img
            className={`project-image b-radius ${!project.image ? 'faded-image' : ''}`}
            src={getProjectImageSrc(projectImage)}
            alt={project.title || 'no_image'}
          />
          {/*<div className="project-desc-info d-flex justify-sb">*/}
          {/*  */}
          {/*</div>*/}
        </div>
        {project.desc}
        <div className="links d-flex">
          {
            Object.entries(project.links)
              .map((link, index) => (
                link[1] && (
                  <a
                    className="b-radius"
                    key={index}
                    href={link[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton
                      text={link[0]}
                      iconId={linksAlias[link[0] as keyof typeof linksAlias]}
                      variant="alpha"
                    />
                  </a>
                )
              ))
          }
        </div>
        {
          project.faq.length > 0 && (
            <Faq
              project={project.title}
              faqData={project.faq}
              highlightId={highlightId}
            />
          )
        }
        <div className="project-support">
          Can’t find the answer you’re looking for? Reach out to our
          <div
            className="pointer"
            style={{
              display: 'inline',
              fontWeight: '900',
            }}
            onClick={() => setShowRocket(true)}
          >👨🏻‍💻 support</div> team.
        </div>
        <div className="links d-flex align-c">
          <IconButton
            variant="alpha"
            iconId="arrow-90deg-left"
            text="Back"
            onClick={handleBack}
          />
          <IconButton
            iconId="pencil"
            variant="success"
            className="blur-bg"
            onClick={() => navigate(`/project/edit/${project.id}`)}
          />
          <IconButton
            iconId="trash"
            variant="danger"
            className="blur-bg"
            onClick={() => navigate(`/project/delete/${project.id}`)}
            disabled
          />
          {/*<div className="d-flex admin-links">*/}
          {/*</div>*/}
        </div>
        {
          project.title.toLowerCase() === 'notcoin' && showRocket && (
            <div className={`not-rocket ${rocketLaunch ? 'launch' : ''}`} onClick={handleRocketLaunch}>
              <img
                className="not-rocket-shake"
                src={Rocket}
                alt="Rocket"
              />
            </div>
          )
        }
        {
          project.title.toLowerCase() === 'not games' && (
            <ToastyEasterEgg />
          )
        }
      </div>
    </>
  );
}
