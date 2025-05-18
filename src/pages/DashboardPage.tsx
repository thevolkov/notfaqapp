import {useSelector, useDispatch} from 'react-redux';
import {type RootState, updateUser, deleteProject, setCurrentUser} from '../app/store';
import {useState} from 'react';
import IconButton from '../shared/ui/IconButton';
import ProjectForm from '../features/project-form/ProjectForm';
import Popup from '../shared/ui/Popup';
import {useBackButton} from '../shared/lib';
import './DashboardPage.css';
import {type Role} from '../entities/user/userSlice';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.user.users);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const {handleBack} = useBackButton();
  const [activeTab, setActiveTab] = useState<'users' | 'projects' | 'roles'>('users');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>('user');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<string | null>(null);

  if (!currentUser) return <div>Пользователь не найден</div>;

  const isGodmode = currentUser.role === 'godmode';
  const isEditor = currentUser.role === 'editor';
  const isUser = currentUser.role === 'user';

  // Определяем доступные пункты меню
  const menuItems = [];
  if (isGodmode) {
    menuItems.push('users', 'projects', 'roles');
  } else if (isEditor) {
    menuItems.push('projects', 'roles');
  } else if (isUser) {
    menuItems.push('roles');
  }

  // Устанавливаем активный таб, если текущий недоступен
  if (!menuItems.includes(activeTab)) {
    setActiveTab(menuItems[0] || 'roles');
  }

  // Фильтруем проекты для editor
  const availableProjects = isEditor
    ? projects.filter((project) => currentUser.allowedProjects.includes(project.id))
    : projects;

  const handleCheckboxChange = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleAssignRole = () => {
    if (selectedUserId) {
      dispatch(
        updateUser({
          id: selectedUserId,
          role: selectedRole,
          allowedProjects: selectedRole === 'editor' ? selectedProjects : [],
        })
      );
      setSelectedUserId(null);
      setSelectedProjects([]);
      setSelectedRole('user');
    }
  };

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject(projectId));
    setIsDeleteConfirmOpen(null);
  };

  // Переключение ролей
  const handleSwitchRole = (role: Role) => {
    const userToSwitch = users.find((user) => user.role === role);
    if (userToSwitch) {
      dispatch(setCurrentUser(userToSwitch.id));
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <IconButton iconId="arrow-back" text="Назад" onClick={handleBack} />
      </div>
      <div className="dashboard-content">
        <aside className="dashboard-menu bg-blur">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`menu-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => setActiveTab(item as 'users' | 'projects' | 'roles')}
            >
              {item === 'users' && 'Пользователи'}
              {item === 'projects' && 'Проекты'}
              {item === 'roles' && 'Роли'}
            </button>
          ))}
        </aside>
        <div className="dashboard-main bg-blur">
          {activeTab === 'users' && isGodmode && (
            <div className="users-section">
              <h2>Пользователи</h2>
              <div className="users-list">
                {users.map((user) => (
                  <div key={user.id} className="user-item">
                    <span>{user.name} ({user.role})</span>
                    <IconButton
                      iconId="edit"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setSelectedRole(user.role);
                        setSelectedProjects(user.allowedProjects);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'projects' && (isGodmode || isEditor) && (
            <div className="projects-section">
              <h2>Проекты</h2>
              {availableProjects.length > 0 ? (
                <div className="projects-list">
                  {availableProjects.map((project) => (
                    <div key={project.id} className="project-item">
                      <span>{project.title}</span>
                      <div className="project-actions">
                        <IconButton
                          iconId="edit"
                          onClick={() => setSelectedProjectId(project.id)}
                        />
                        {isGodmode && (
                          <IconButton
                            iconId="trash"
                            variant="danger"
                            onClick={() => setIsDeleteConfirmOpen(project.id)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-projects">Доступных проектов нет</p>
              )}
            </div>
          )}
          {activeTab === 'roles' && (
            <div className="roles-section">
              <h2>Роли</h2>
              <div className="roles-list">
                {['user', 'editor', 'godmode'].map((role) => (
                  <div
                    key={role}
                    className={`role-item ${currentUser.role === role ? 'selected' : ''}`}
                    onClick={() => handleSwitchRole(role as Role)}
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Попап для редактирования пользователя */}
      {selectedUserId && (
        <Popup
          title={`Редактирование: ${users.find((u) => u.id === selectedUserId)?.name}`}
          onClose={() => {
            setSelectedUserId(null);
            setSelectedProjects([]);
            setSelectedRole('user');
          }}
          onSubmit={handleAssignRole}
          submitDisabled={selectedRole === 'editor' && selectedProjects.length === 0}
        >
          <label>
            Роль:
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
            >
              <option value="user">Обычный пользователь</option>
              <option value="editor">Редактор</option>
              <option value="godmode">Godmode</option>
            </select>
          </label>
          {selectedRole === 'editor' && (
            <div className="projects-list">
              <h4>Выберите проекты для редактирования:</h4>
              {projects.map((project) => (
                <label key={project.id}>
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => handleCheckboxChange(project.id)}
                  />
                  {project.title}
                </label>
              ))}
            </div>
          )}
        </Popup>
      )}

      {/* Попап для редактирования проекта */}
      {selectedProjectId && (
        <Popup
          status={selectedProjectId}
          title="Редактировать проект"
          onClose={() => setSelectedProjectId(null)}
        >
          <ProjectForm
            project={projects.find((p) => p.id === selectedProjectId)}
            onClose={() => setSelectedProjectId(null)}
          />
        </Popup>
      )}

      {/* Попап для подтверждения удаления проекта */}
      {isDeleteConfirmOpen && (
        <Popup
          title="Подтверждение удаления"
          onClose={() => setIsDeleteConfirmOpen(null)}
          onSubmit={() => handleDeleteProject(isDeleteConfirmOpen)}
          submitText="Удалить"
          cancelText="Отмена"
        >
          <p>Вы уверены, что хотите удалить проект?</p>
        </Popup>
      )}
    </div>
  );
}
