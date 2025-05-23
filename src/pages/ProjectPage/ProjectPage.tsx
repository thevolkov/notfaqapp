import './ProjectPage.css';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {type RootState} from '../../app/store';
import {NavLink, useParams} from 'react-router-dom';
import IconButton from '../../shared/ui/IconButton/IconButton';
import {type Project} from '../../entities/project/projectSlice';
import {useBackButton} from '../../shared/lib';
import Title from '../../shared/ui/Title/Title';
import Faq from '../../shared/ui/Faq/Faq';
import {linksAlias} from '../../shared/constants';
import Rocket from '../../shared/assets/imgs/notRock.png';
import {ToastyEasterEgg} from '../../shared/ui';

export default function ProjectPage() {
  const {id} = useParams<{id: string}>();
  const {handleBack} = useBackButton();
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunch, setRocketLaunch] = useState(false);
  const [projectImage, setProjectImage] = useState('');

  const project: Project | undefined = useSelector((state: RootState) =>
    state.projects.projects.find((project) => project.id === id))

  const handleChangeImage = () => {
    setProjectImage(project?.image || '/imgs/no_image.png')
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

      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior: 'smooth'});
    }
  }, [project]);

  useEffect(() => {
    if (project?.title.toLowerCase() === 'notcoin' && rocketLaunch) {
      setProjectImage('/imgs/projects/Notcoin-Game.jpg')
    }
  }, [project?.title, rocketLaunch])

  if (!project) {
    return <Title text="Project not found ¯\_(ツ)_/¯" size="l" />;
  }

  return (
    <div className="project-page">
      <Title text={project.title} size="4xl" shadow />
      <div className="d-flex project-desc">
        <img
          className="project-image b-radius"
          src={
            projectImage.startsWith('data:image')
              ? projectImage
              : `${import.meta.env.BASE_URL}${projectImage}`
          }
          alt={project.title || 'no_image'}
          style={!project.image ? {opacity: 0.025} : undefined}
        />
        <div className="d-flex flex-column project-desc-info">
          {project.desc}
          <div className="links">
            {
              Object.entries(project.links)
                .map((link, index) => (
                  link[1] && (
                    <a
                      className="b-radius blur-bg"
                      key={index}
                      href={link[1]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconButton
                        // text="edit"
                        iconId={linksAlias[link[0] as keyof typeof linksAlias]}
                        // variant="dark-alpha"
                      />
                    </a>
                  )
                ))
            }
          </div>
          <div className="links admin-links">
            <NavLink to={`/project/edit/${project.id}`}>
              <IconButton
                // text="edit"
                iconId="pencil"
                variant="dark-alpha"
                className="blur-bg"
              />
            </NavLink>
            <NavLink to="">
              <IconButton
                // text="delete"
                iconId="trash"
                variant="light-alpha"
                className="blur-bg"
                disabled
              />
            </NavLink>
          </div>
        </div>
      </div>
      <Faq project={project.title} faqData={project.faq} highlightId={highlightId} />
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
      <IconButton
        iconId="arrow-90deg-left"
        text="Back"
        onClick={handleBack}
      />
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
  );
}
