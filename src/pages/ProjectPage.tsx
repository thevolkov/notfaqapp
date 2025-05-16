import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, deleteProject } from '../app/store';
import { useParams } from 'react-router-dom';
import ProjectForm from '../features/project-form/ProjectForm';
import IconButton from '../shared/ui/IconButton';
import { type Project } from '../entities/project/projectSlice';
import { useBackButton } from '../shared/lib';
import './ProjectPage.css';
import Title from '../shared/ui/Title';
import Faq from '../shared/ui/Faq';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const project: Project | undefined = useSelector((state: RootState) =>
        state.projects.projects.find((project) => project.id === id))
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { handleBack } = useBackButton();

  if (!project) return <div>Project not found</div>;

  const canEdit =
    currentUser?.role === 'godmode' || (
      currentUser?.role === 'editor' &&
      currentUser.allowedProjects.includes(project.id)
    );
  const canDelete = currentUser?.role === 'godmode';

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(project.id));
      handleBack();
    }
  };

  // useEffect(() => {
  //   if (project && isPopupOpen) {
  //     document.body.classList.add("no-scroll")
  //   } else {
  //     document.body.classList.remove("no-scroll")
  //   }
  //
  //   return () => {
  //     document.body.classList.remove("no-scroll")
  //   }
  // }, [isPopupOpen]);

  return (
    <div className="project-page">
      <IconButton
        iconId="arrow-back"
        text="Back"
        onClick={handleBack}
      />
      <div className="project-image">
        <img className="b-radius" src={project.image} alt={project.title} />
        {(canEdit || canDelete) && (
          <div className="project-actions">
            {canEdit && (
              <IconButton
                iconId="edit"
                // iconColor="success"
                onClick={() => setIsPopupOpen(true)}
              />
            )}
            {canDelete && (
              <IconButton
                iconId="trash"
                // iconColor="danger"
                onClick={handleDelete}
              />
            )}
          </div>
        )}
      </div>
      <Title text={project.title} />
      {project.desc}
      <div className="links">
        {Object.entries(project.links).map((link, index) => (
          link[1] ? <a key={index} href={link[1]} target="_blank" rel="noopener noreferrer">
            {link[0]}
          </a> : ''
        ))}
      </div>

      <Faq faqData={project.faq} />

      {isPopupOpen && (
        <ProjectForm project={project} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
