import {memo} from 'react';
import {useNavigate} from 'react-router-dom';
import {IconButton, Title} from '../../shared/ui';
import {getProjectImageSrc} from '../../shared/lib/imageHelpers';
import {type Project} from '../../entities/project/projectSlice';

const ProjectCard = ({project}: {project: Project}) => {
  const navigate = useNavigate();

  if (project.id === '666') return null;

  return (
    <div
      className="project-list-page-card d-flex flex-column relative pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {
        !project.published && (
          <IconButton
            className="project-list-page-card-status absolute tooltip"
            data-tooltip="unpublished"
            variant="primary"
            iconId="eye-slash"
          />
        )
      }
      <img
        loading="lazy"
        className={`b-radius ${!project.image || !project.published ? 'faded-image' : ''}`}
        src={getProjectImageSrc(project.image)}
        alt={project.title || 'no_image'}
      />
      <Title text={project.title} size="s" />
    </div>
  );
};

export default memo(ProjectCard);
