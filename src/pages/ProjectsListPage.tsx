import { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { Link } from 'react-router-dom';
import ProjectForm from '../features/project-form/ProjectForm';
import Title from '../shared/ui/Title';
import IconButton from '../shared/ui/IconButton';
import './ProjectsListPage.css';

export default function ProjectsListPage() {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const canAddProject = currentUser?.role === 'godmode';

  return (
    <div className="projects-list">
      <Title text="Not Faq" />
      <div className="projects-grid">
        {projects.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id} className="project-card">
            <img className="b-radius" src={project.image} alt={project.title} />
            <Title text={project.title} />
          </Link>
        ))}
        {canAddProject && (
          <IconButton
            className="b-radius add-project"
            iconId="plus"
            onClick={() => setIsPopupOpen(true)}
          />
        )}
      </div>
      {isPopupOpen && (
        <ProjectForm onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
