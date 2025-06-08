import './ProjectPage.css';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {type RootState, useAppSelector} from '../../app/store';
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

const titleTranscription: Record<string, string> = {
  'notcoin': '[nɒtkɔɪn]',
  'dogs': '[dɒɡz]',
  'community': '[kəˈmjuːnɪtɪ]',
  'not pixel': '[nɒt ˈpɪksɪl]',
  'sticker pack': '[ˈstɪkə pæk]',
  'earn': '[ɜːn]',
  'not games': '[nɒt geɪmz]',
  'void': '[vɔɪd]',
  'voucher': '[ˈvaʊʧə]',
};

export default function ProjectPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const showVouchers = useAppSelector((state) => state.console.vouchers);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const {handleBack} = useBackButton();

  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunch, setRocketLaunch] = useState(false);
  const [projectImage, setProjectImage] = useState('');

  const project: Project | undefined = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === id)
  );

  const projectTitleLower = project?.title.toLowerCase() || '';

  const handleShowRocket = () => setShowRocket(true);
  const handleRocketLaunch = () => setRocketLaunch(true);

  useEffect(() => {
    if (!project) return;

    if (projectTitleLower === 'notcoin' && rocketLaunch) {
      setProjectImage('/imgs/projects/Notcoin-Game.jpg');
    } else {
      setProjectImage(project.image || '');
    }
  }, [project, rocketLaunch, projectTitleLower]);

  // useEffect(() => {

  // if (rocketLaunch) {
  // const timer = setTimeout(() => {
  //   setRocketLaunch(false);
  //   setShowRocket(false);
  // }, 10000);
  // return () => clearTimeout(timer);
  // }
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
        {
          !showVouchers && currentUser?.role === 'godmode' && (
            <>
              <IconButton
                iconId="pencil"
                variant="alpha"
                onClick={() => navigate(`/project/edit/${project.id}`)}
              />
            </>
          )
        }
        {
          !project.published && (
            <IconButton
              className="tooltip"
              data-tooltip="draft"
              variant="alpha"
              iconId="eye-slash"
              disabled
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
        <div className="project-page-title d-flex flex-column justify-c">
          <div className="d-flex align-s">
            <Title
              text={project.title}
              size="2xl"
              shadow
            />
            <LottieIcon
              className={`project-page-title-icon relative ${projectTitleLower === 'notcoin' ? 'pointer' : ''}`}
              iconId={project.title}
              onClick={projectTitleLower === 'notcoin' ? handleShowRocket : undefined}
            />
          </div>
          <Title
            className="transcription relative"
            text={titleTranscription[project.title.toLowerCase()] ?? ''}
            size="s"
          />
          {project.desc}
        </div>
      </div>
      <div className="project-page-links d-flex flex-wrap">
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
          <div className="d-flex flex-column">
            <Faq project={project.title} faqData={project.faq} />
            {
              id !== '000' && (
                <div className="faq faq-egg element-wrapper blur-bg relative border-none">
                  <div className="faq-question pointer" onClick={() => navigate("/666")}>
                    <Title
                      text="Wen CEX??? Wen PUMP??? Wen SKINS???"
                      subtitle="☠️ Don't open this tab. Ok? OK?????"
                      size="l"
                    />
                    <IconButton
                      variant="danger"
                      iconId="plus-lg"
                      className="b-radius blur-bg"
                    />
                  </div>
                </div>
              )
            }
            {
              !showVouchers && (
                <div className="project-support">
                  Can’t find the answer you’re looking for? Reach out to our <span
                  className="link pointer">support</span> team 🥸
                </div>
              )
            }
          </div>
        )
      }
      {
        projectTitleLower === 'notcoin' && showRocket && (
          <NotRocket rocketLaunch={rocketLaunch} onClick={handleRocketLaunch} />
        )
      }
      <Toasty />
    </div>
  )
}
