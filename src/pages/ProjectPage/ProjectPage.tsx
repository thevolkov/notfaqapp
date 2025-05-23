import './ProjectPage.css';
import {useState, useEffect} from 'react';
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
  const [launch, setLaunch] = useState(false);

  const project: Project | undefined = useSelector((state: RootState) =>
    state.projects.projects.find((project) => project.id === id))

  const handleLaunch = () => {
    setLaunch(true);

    const contentEl = document.querySelector('.content') as HTMLElement | null;

    if (contentEl) {
      contentEl.classList.add('animate-bg');

      setTimeout(() => {
        contentEl.classList.remove('animate-bg');
      }, 100000);
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

  if (!project) {
    return <Title text="Project not found ¯\_(ツ)_/¯" size="l" />;
  }

  return (
    <div className="project-page">
      <Title text={project.title} size="4xl" shadow />
      <div className="d-flex project-desc">
        <img
          className="project-image b-radius"
          src={project.title.toLowerCase() === 'notcoin' && launch
            ? `${import.meta.env.BASE_URL}/imgs/projects/Notcoin-Game.jpg`
            : `${import.meta.env.BASE_URL}${project.image}`
            || '/imgs/no_image.png'}
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
          <div className={`not-rocket ${launch ? 'launch' : ''}`} onClick={handleLaunch}>
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
