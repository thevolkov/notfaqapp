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
import {Toasty} from '../../shared/ui';
import {getProjectImageSrc} from '../../shared/lib/imageHelpers';
import LottieIcon from '../../shared/ui/LottieIcon/LottieIcon';
import NotRocket from '../../shared/ui/EasterEggs/NotRocket/NotRocket';

export default function ProjectPage() {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const {handleBack} = useBackButton();

  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunch, setRocketLaunch] = useState(false);
  const [projectImage, setProjectImage] = useState('');

  const project: Project | undefined = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === id)
  );

  const projectTitleLower = project?.title.toLowerCase() || '';

  const handleRocketLaunch = () => setRocketLaunch(true);
  const handleShowRocket = () => setShowRocket(true);

  useEffect(() => {
    if (!project) return;

    if (projectTitleLower === 'notcoin' && rocketLaunch) {
      setProjectImage('/imgs/projects/Notcoin-Game.jpg');
    } else {
      setProjectImage(project.image || '');
    }
  }, [project, rocketLaunch, projectTitleLower]);

  useEffect(() => {
    if (rocketLaunch) {
      const timer = setTimeout(() => {
        setRocketLaunch(false);
        setShowRocket(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [rocketLaunch]);

  if (!project) {
    return <Title text="Project not found ¯\_(ツ)_/¯" size="xl" />;
  }

  return (
    <>
      <div className="project-title d-inline-flex align-c">
        <Title text={project.title} size="2xl" shadow />
        <LottieIcon
          className={projectTitleLower === 'notcoin' ? 'pointer' : ''}
          iconId={project.title}
          onClick={projectTitleLower === 'notcoin' ? handleShowRocket : undefined}
        />
      </div>
      <div className="project-page">
        <div className="project-desc">
          <img
            className={`project-image b-radius ${!project.image ? 'faded-image' : ''}`}
            src={getProjectImageSrc(projectImage)}
            alt={project.title || 'no_image'}
          />
        </div>
        {project.desc}
        <div className="links d-flex">
          {
            Object.entries(project.links).map(([key, url]) =>
              url ? (
                <a
                  className="b-radius"
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    text={key}
                    iconId={linksAlias[key as keyof typeof linksAlias]}
                    variant="alpha"
                  />
                </a>
              ) : null
            )
          }
        </div>
        {project.faq.length > 0 && <Faq project={project.title} faqData={project.faq} />}
        <div className="project-support">
          Can’t find the answer you’re looking for? Reach out to our
          <span className="support-highlight">👨🏻‍💻 support</span> team.
        </div>
        <div className="links d-flex align-c">
          <IconButton variant="alpha" iconId="arrow-90deg-left" text="Back" onClick={handleBack} />
          <IconButton
            iconId="pencil"
            variant="success"
            className="blur-bg"
            onClick={() => navigate(`/project/edit/${project.id}`)}
          />
          <IconButton iconId="trash" variant="danger" className="blur-bg" disabled />
        </div>

        {
          projectTitleLower === 'notcoin' && showRocket && (
            <NotRocket rocketLaunch={rocketLaunch} onClick={handleRocketLaunch} />
          )
        }
        {
          projectTitleLower === 'not games' && <Toasty />
        }
      </div>
    </>
  );
}
