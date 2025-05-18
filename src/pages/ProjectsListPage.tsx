import './ProjectsListPage.css';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {type RootState} from '../app/store';
import {Link} from 'react-router-dom';
import ProjectForm from '../features/project-form/ProjectForm';
import Title from '../shared/ui/Title';
import IconButton from '../shared/ui/IconButton';

export default function ProjectsListPage() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const canAddProject = currentUser?.role === 'godmode';

  return (
    <div className="projects-list">
      <div className="projects-list--header">
        <Title
          text="not faq"
          subtitle="there's nothing here ¯\_(ツ)_/¯"
          size="4xl"
          shadow
        />
        {
          canAddProject && (
            <IconButton
              variant="dark-alpha"
              className="b-radius add-project"
              iconId="plus"
              iconSize="2"
              onClick={() => setIsPopupOpen(true)}
            />
          )
        }
      </div>
      <div className="projects-grid">
        {
          projects.map((project) => (
            <Link
              className="project-card"
              to={`/project/${project.id}`}
              key={project.id}
            >
              <img
                className="b-radius"
                src={project.image}
                alt={project.title}
              />
              <Title text={project.title} size="l" />
            </Link>
          ))
        }
      </div>
      {
        isPopupOpen && (
          <ProjectForm onClose={() => setIsPopupOpen(false)} />
        )
      }
    </div>
  );
}
