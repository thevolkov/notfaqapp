import {memo} from 'react';
import {useNavigate} from 'react-router-dom';
import {IconButton, Title} from '../../shared/ui';
import {getProjectImageSrc} from '../../shared/lib/imageHelpers';
import {type Project} from '../../entities/project/projectSlice';
import premiumCheckMark from '../../shared/assets/icons/premium-check.svg';

function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  if (project.id === '666') return null;

  return (
    <div
      className="project-card d-flex flex-column relative pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {
        !project.published && (
          <IconButton
            className="project-card-status absolute tooltip"
            data-tooltip="draft"
            variant="primary"
            iconId="eye-slash"
          />
        )
      }
      <img
        className={`project-card-image b-radius ${!project.image || !project.published ? 'faded-image' : ''}`}
        src={getProjectImageSrc(project.image)}
        alt={project.title || 'no_image'}
      />
      <div className="d-flex gap-0 fit-content relative">
        <Title text={project.title} size="s" />
        <img
          className="premium-icon absolute"
          src={premiumCheckMark}
          alt="premium-icon"
        />
      </div>
    </div>
  )
}

export default memo(ProjectCard);
