import './DashboardPage.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  type RootState,
  updateUser,
  // deleteProject,
  setCurrentUser
} from '../../app/store';
import {type Role} from '../../entities/user/userSlice';
// import {useBackButton} from '../../shared/lib';
import {AnimatedBlock, Title, IconButton} from '../../shared/ui';

type TabKey = 'projects' | 'users' | 'roles';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.user.users);
  const projects = useSelector((state: RootState) => state.projects.projects);
  // const {handleBack} = useBackButton();
  const [activeTab, setActiveTab] = useState<'users' | 'projects' | 'roles'>('users');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  // const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  // const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<string | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>('user');
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(false);

  if (!currentUser) return <div>Пользователь не найден</div>;

  const isGodmode = currentUser.role === 'godmode';
  const isEditor = currentUser.role === 'editor';
  const isUser = currentUser.role === 'user';

  let menuItems: TabKey[] = [];

  if (isGodmode) {
    menuItems = ['users', 'projects', 'roles'];
  } else if (isEditor) {
    menuItems = ['projects', 'roles'];
  } else if (isUser) {
    menuItems = ['roles'];
  }

  if (!menuItems.includes(activeTab)) {
    setActiveTab(menuItems[0] || 'roles');
  }

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
      setEditUser(!editUser)
    }
  };

  // const handleDeleteProject = (projectId: string) => {
  //   dispatch(deleteProject(projectId));
  //   setIsDeleteConfirmOpen(null);
  // };

  const handleSwitchRole = (role: Role) => {
    const userToSwitch = users.find((user) => user.role === role);
    if (userToSwitch) {
      dispatch(setCurrentUser(userToSwitch.id));
    }
  };

  return (
    <div className="dashboard-page">
      <div style={{top: '1rem', zIndex: '9999999999', borderRadius: '2rem'}} className="absolute blur-bg ">
        <IconButton
          iconId={show ? 'x-lg' : 'list'}
          variant="light-alpha"
          onClick={() => setShow((prev) => !prev)}
        />
      </div>
      <AnimatedBlock
        className="dashboard-menu-block shadow"
        visible={show}
        direction="top"
        // preserveMount={false}
      >
        <div className="dashboard-menu">
          {
            menuItems.map((item) => (
              <button
                key={item}
                className={`menu-item ${activeTab === item ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item as 'users' | 'projects' | 'roles')
                  setShow(!show)
                }}
              >
                {item === 'users' && 'Users'}
                {item === 'projects' && 'Projects'}
                {item === 'roles' && 'Permissions'}
              </button>
            ))
          }
        </div>
      </AnimatedBlock>
      <div className="dashboard-content">
        <div className="dashboard-main">
          {
            activeTab === 'users' && isGodmode && (
              <div className="users-section">
                <Title
                  text="Users"
                  size="4xl"
                  shadow
                />
                <div className="users-list">
                  {
                    users.map((user) => (
                      <div key={user.id} className="user-item">
                        <span>{user.name} ({user.role})</span>
                        <IconButton
                          text="Edit"
                          iconId="pencil"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setSelectedRole(user.role);
                            setSelectedProjects(user.allowedProjects);
                            setEditUser(!editUser);
                          }}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          {
            activeTab === 'projects' && (isGodmode || isEditor) && (
              <div className="projects-section">
                <Title
                  text="Projects"
                  size="4xl"
                  shadow
                />
                {
                  availableProjects.length > 0 ? (
                    <div className="projects-list">
                      {
                        availableProjects.map((project) => (
                          <div key={project.id} className="project-item">
                            <span>{project.title}</span>
                            <div className="project-actions">
                              <Link to={`/project/edit/${project.id}`}>Edit</Link>
                              {
                                isGodmode && (
                                  <IconButton
                                    iconId="trash"
                                    // onClick={() => setIsDeleteConfirmOpen(project.id)}
                                  />
                                )
                              }
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="no-projects">No available projects</div>
                  )
                }
              </div>
            )
          }
          {
            activeTab === 'roles' && (
              <div className="roles-section">
                <Title
                  text="Permissions"
                  size="4xl"
                  shadow
                />
                <div className="roles-list">
                  {
                    ['user', 'editor', 'godmode'].map((role) => (
                      <div
                        key={role}
                        className={`role-item ${currentUser.role === role ? 'selected' : ''}`}
                        onClick={() => handleSwitchRole(role as Role)}
                      >
                        {role}
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
      <AnimatedBlock visible={editUser} direction="bottom">
        <div className="dashboard-user-edit">
          <label>
            Role:
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value as Role)}
            >
              <option value="user">User</option>
              <option value="editor">Edit</option>
              <option value="godmode">Godmode</option>
            </select>
          </label>
          {
            selectedRole === 'editor' && (
              <div className="dashboard-projects-list">
                <h4>Edit projects:</h4>
                {
                  projects.map((project) => (
                    <label key={project.id}>
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project.id)}
                        onChange={() => handleCheckboxChange(project.id)}
                      />
                      {project.title}
                    </label>
                  ))
                }
              </div>
            )
          }
          <div className="test">
            <IconButton
              text="Save"
              iconId="pencil"
              variant="dark-alpha"
              onClick={handleAssignRole}
            />
            <IconButton
              text="Cancel"
              iconId="x-lg"
              variant="dark-alpha"
              onClick={() => {
                setEditUser(!editUser);
                setSelectedUserId(null);
                setSelectedProjects([]);
                setSelectedRole('user');
              }}
            />
          </div>
        </div>
      </AnimatedBlock>

      {/*????*/}

      {/*<Popup*/}
      {/*  isOpen={!!isDeleteConfirmOpen}*/}
      {/*  title="You sure?"*/}
      {/*  onClose={() => setIsDeleteConfirmOpen(null)}*/}
      {/*  onSubmit={() => handleDeleteProject(isDeleteConfirmOpen!)}*/}
      {/*  submitText="Del"*/}
      {/*  cancelText="Cancel"*/}
      {/*>*/}
      {/*  <p>????????????</p>*/}
      {/*</Popup>*/}
    </div>
  );
}
