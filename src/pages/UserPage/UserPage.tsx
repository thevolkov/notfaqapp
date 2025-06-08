import './UserPage.css';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState, setCurrentUser} from '../../app/store';
import ThemeToggle from '../../features/ThemeToggle/ThemeToggle';
import {AnimatedBlock, IconButton, UserRoleMark, Avatar, Title} from '../../shared/ui';
import premiumCheckMark from '../../shared/assets/icons/premium-check.svg'

export default function UserPage() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSwitchRole = (id: string) => {
    const userToSwitch = users.find((user) => user.id === id);
    if (userToSwitch) {
      dispatch(setCurrentUser(userToSwitch.id));
    }
  };

  if (!currentUser) return <div>User not found</div>;

  return (
    <div className="user-page d-flex flex-column align-c">
      <div className="user-page-avatar relative d-flex justify-c">
        <Avatar img={currentUser?.avatar} />
        {
          currentUser.role !== 'user' && (
            <UserRoleMark
              className="user-page-role absolute"
              role={currentUser.role}
            />
          )
        }
      </div>
      <div className="user-page-header d-flex flex-column align-c">
        <div className="d-flex relative">
          <Title
            text={currentUser.name}
            size="m"
          />
          {
            currentUser.isPremium && (
              <img
                className="tg-premium absolute"
                src={premiumCheckMark}
                alt="tg-premium"
              />
            )
          }
        </div>
        <div className="subtitle">username: {currentUser.userName || '-netu-'}</div>
        <div className="subtitle">id: {currentUser.id}</div>
        <hr/>
        <ThemeToggle />
      </div>
      <AnimatedBlock
        hideWithoutUnmount={true}
        visible={!showSidebar}
        direction="right"
      >
        <div className="sidebar d-flex flex-column p-1">
          <div className="sidebar-toggle-wrapper absolute">
            <IconButton
              className="sidebar-toggle"
              iconId={!showSidebar ? 'x-lg' : 'list'}
              variant="primary"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
          <div>Temporary sidebar ⚙️</div>
          <Title
            text="All users"
            size="s"
          />
          <div className="user-page-permissions">
            {
              users.map((user) => (
                <div
                  key={user.id}
                  className={`d-flex justify-sb align-c role-item ${currentUser.id === user.id ? 'selected' : ''}`}
                  onClick={() => handleSwitchRole(user.id)}
                >
                  <div className="d-flex align-c">
                    <Avatar variant="mini" img={user?.avatar} />
                    {user.name}
                  </div>
                  <UserRoleMark role={user.role} />
                </div>
              ))
            }
          </div>
        </div>
      </AnimatedBlock>
    </div>
  )
}
