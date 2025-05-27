import './UserPage.css';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState, setCurrentUser} from '../../app/store';
import IconButton from '../../shared/ui/IconButton/IconButton';
import {useBackButton} from '../../shared/lib';
import Title from '../../shared/ui/Title/Title.tsx'
import ThemeToggle from '../../shared/ui/ThemeToggle/ThemeToggle';
import UserAvatar from '../../shared/ui/UserAvatar/UserAvatar';
import UserRole from '../../shared/ui/UserRole/UserRole';
import premiumCheckMark from '../../shared/assets/icons/premium-check.svg'
import silverBone from '../../shared/assets/icons/dogs-silver-bone.png'
import goldenBone from '../../shared/assets/icons/dogs-golden-bone.png'
import notPlatinum from '../../shared/assets/icons/not-platinum.png'
import goldenPx from '../../shared/assets/icons/golden-px.png'
import {type Role} from '../../entities/user/userSlice';

const achivAlias = {
  'not-platinum': notPlatinum,
  'dogs-silver-bone': silverBone,
  'dogs-gold-bone': goldenBone,
  'golden-px': goldenPx,
}

export default function UserPage() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const {handleBack} = useBackButton();

  const handleSwitchRole = (role: Role) => {
    const userToSwitch = users.find((user) => user.role === role);
    if (userToSwitch) {
      dispatch(setCurrentUser(userToSwitch.id));
    }
  };

  if (!currentUser) return <div>User not found</div>;

  return (
    <div className="user-page d-flex flex-column">
      <div className="d-flex justify-sb">
        <div className="user-page-avatar relative d-inline-flex justify-c">
          {
            currentUser.isPremium && (
              <img
                className="user-page-premium absolute"
                src={premiumCheckMark}
                alt="tg-premium"
              />
            )
          }
          <UserAvatar img={currentUser?.avatar || 'no-avatar'} />
          <UserRole
            className="user-page-role absolute"
            role={currentUser.role}
          />
        </div>
        <ThemeToggle />
      </div>

      <div className="user-page-header">
        <div className="d-inline-flex relative">
          <Title
            className="user-page-name"
            text={currentUser.name}
            size="2xl"
            shadow
          />
          {
            currentUser.achievements.length >= 1 && (
              <div
                style={{right: `-${currentUser?.achievements.length * 1.5 + .5}rem`}}
                className="user-page-achivs absolute d-inline-flex"
              >
                {
                  currentUser.achievements.map((achiv) => (
                    <img
                      className="user-page-achiv"
                      src={achivAlias[achiv]}
                      alt="tg-premium"
                      key={achiv}
                    />
                  ))
                }
              </div>
            )
          }
        </div>
        <div>username: {currentUser.userName || '-netu-'}</div>
        <div>id: {currentUser.id}</div>
      </div>
      <Title
        text="Permissions"
        size="s"
      />
      <div className="user-page-permissions">
        {
          ['godmode', 'editor', 'user'].map((role) => (
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
      <IconButton
        variant="alpha"
        iconId="arrow-90deg-left"
        text="Back"
        onClick={handleBack}
      />
    </div>
  );
}
