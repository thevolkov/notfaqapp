import './ProjectPage.css';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState, deleteProject} from '../../app/store';
import {useNavigate, useParams} from 'react-router-dom';
import IconButton from '../../shared/ui/IconButton/IconButton';
import {type Project} from '../../entities/project/projectSlice';
import {useBackButton} from '../../shared/lib';
import Title from '../../shared/ui/Title/Title';
import Faq from '../../shared/ui/Faq/Faq';
import {linksAlias} from '../../shared/constants';
import {AnimatedBlock, Toasty} from '../../shared/ui';
import {getProjectImageSrc} from '../../shared/lib/imageHelpers';
import LottieIcon from '../../shared/ui/LottieIcon/LottieIcon';
import NotRocket from '../../shared/ui/EasterEggs/NotRocket/NotRocket';

export default function ProjectPage() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleBack} = useBackButton();

  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunch, setRocketLaunch] = useState(false);
  const [projectImage, setProjectImage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const project: Project | undefined = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === id)
  );

  const projectTitleLower = project?.title.toLowerCase() || '';

  const handleRocketLaunch = () => setRocketLaunch(true);
  const handleShowRocket = () => setShowRocket(true);

  const handleDelete = () => {
    if (!id) return

    dispatch(deleteProject(id));
    navigate('/');
  };

  useEffect(() => {
    if (!project) return;

    if (projectTitleLower === 'notcoin' && rocketLaunch) {
      setProjectImage('/imgs/projects/Notcoin-Game.jpg');
    } else {
      setProjectImage(project.image || '');
    }
  }, [project, rocketLaunch, projectTitleLower]);

  // useEffect(() => {
  //   if (rocketLaunch) {
  //     const timer = setTimeout(() => {
  //       setRocketLaunch(false);
  //       setShowRocket(false);
  //     }, 10000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [rocketLaunch]);

  if (!project) {
    return <Title text="Project not found ¯\_(ツ)_/¯" size="xl" />;
  }

  return (
    <div className="project-page d-flex flex-column relative">
      <div className="project-page-navigate d-flex">
        <IconButton
          variant="alpha"
          iconId="arrow-90deg-left"
          text="Back"
          onClick={handleBack}
        />
        <IconButton
          iconId="pencil"
          variant="alpha"
          onClick={() => navigate(`/project/edit/${project.id}`)}
        />
        <IconButton
          iconId="trash"
          variant="alpha"
          onClick={() => setShowDeleteConfirm(true)}
        />
        {
          !project.published && (
            <IconButton
              className="tooltip"
              data-tooltip="unpublished"
              variant="secondary"
              iconId="eye-slash"
            />
          )
        }
      </div>
      <div className="project-page-head d-flex">
        <img
          className={`project-page-image b-radius ${!project.image ? 'faded-image' : ''}`}
          src={getProjectImageSrc(projectImage)}
          alt={project.title || 'no_image'}
        />
        <div className="project-page-title d-flex">
          <Title text={project.title} size="2xl" shadow />
          <LottieIcon
            className={projectTitleLower === 'notcoin' ? 'pointer' : ''}
            iconId={project.title}
            onClick={projectTitleLower === 'notcoin' ? handleShowRocket : undefined}
          />
        </div>
      </div>
      {project.desc}
      <div className="project-page-links d-flex">
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
      {
        project.faq.length > 0 && (
          <>
            <Faq project={project.title} faqData={project.faq} />
            {
              project.title.toLowerCase() === 'not pixel' && (
                <div className="faq-question pointer" onClick={() => navigate("/666")}>
                  <Title
                    text="Wen CEX??? Wen PUMP???"
                    subtitle="☠️ Don't open this tab. Ok? OK?????"
                    size="l"
                  />
                  <IconButton
                    variant="danger"
                    iconId="plus-lg"
                    className="b-radius blur-bg"
                  />
                </div>
              )
            }
            <div className="project-support">
              Can’t find the answer you’re looking for? Reach out to our <span
              className="link pointer">support</span> team 🥸
            </div>
          </>
        )
      }
      {
        projectTitleLower === 'notcoin' && showRocket && (
          <NotRocket rocketLaunch={rocketLaunch} onClick={handleRocketLaunch} />
        )
      }
      {
        projectTitleLower === 'not games' && (
          <Toasty />
        )
      }

      <AnimatedBlock
        visible={showDeleteConfirm}
        direction="bottom"
      >
        <div className="popup d-flex flex-column align-c justify-c">
          <Title text={`Delete ${project.title}?`} size="l" />
          <div className="d-flex">
            <IconButton
              text="yep"
              iconId="check-lg"
              variant="alpha"
              onClick={handleDelete}
            />
            <IconButton
              text="nope"
              iconId="x-lg"
              variant="primary"
              onClick={() => setShowDeleteConfirm(false)}
            />
          </div>
        </div>
      </AnimatedBlock>
    </div>
  );
}
