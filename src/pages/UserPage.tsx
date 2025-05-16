import { useSelector, useDispatch } from 'react-redux';
import { type RootState, updateUser } from '../app/store';
import IconButton from '../shared/ui/IconButton';
import { useBackButton } from '../shared/lib';
import { useState } from 'react';
import './UserPage.css';
import { type Role } from '../entities/user/userSlice'
import Title from '../shared/ui/Title.tsx'

export default function UserPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.user.users);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const { handleBack } = useBackButton();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>('user');

  if (!currentUser) return <div>Пользователь не найден</div>;

  const isGodmode = currentUser.role === 'godmode';

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

  return (
    <div className="user-page">
      <IconButton iconId="arrow-back" text="Назад" onClick={handleBack} />
      <Title text="Profile" />
      <div>{currentUser.role}</div>
      {isGodmode && (
        <div className="permissions-section">
          <Title text="Users List" />
          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <div>{user.name} ({user.role})</div>
                <IconButton
                  text="Edit"
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
          {selectedUserId && (
            <div className="edit-user-section">
              <h3>Редактирование: {users.find((u) => u.id === selectedUserId)?.name}</h3>
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
              <div className="edit-user-actions">
                <IconButton
                  text="Сохранить"
                  iconId="edit"
                  onClick={handleAssignRole}
                  disabled={selectedRole === 'editor' && selectedProjects.length === 0}
                />
                <IconButton
                  text="Отмена"
                  variant="secondary"
                  onClick={() => {
                    setSelectedUserId(null);
                    setSelectedProjects([]);
                    setSelectedRole('user');
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
