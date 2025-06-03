import './UserPage.css';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState, setCurrentUser} from '../../app/store';
import Title from '../../shared/ui/Title/Title.tsx'
import ThemeToggle from '../../features/ThemeToggle/ThemeToggle';
import UserAvatar from '../../shared/ui/UserAvatar/UserAvatar';
import UserRoleMark from '../../shared/ui/UserRoleMark/UserRoleMark';
import premiumCheckMark from '../../shared/assets/icons/premium-check.svg'
import silverBone from '../../shared/assets/icons/dogs-silver-bone.png'
import goldenBone from '../../shared/assets/icons/dogs-golden-bone.png'
import notPlatinum from '../../shared/assets/icons/not-platinum.png'
import goldenPx from '../../shared/assets/icons/golden-px.png'

type AchievementKey = 'not-platinum' | 'dogs-silver-bone' | 'dogs-gold-bone' | 'golden-px';

const achievementAlias = {
  'not-platinum': notPlatinum,
  'dogs-silver-bone': silverBone,
  'dogs-gold-bone': goldenBone,
  'golden-px': goldenPx,
};

export default function UserPage() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleSwitchRole = (id: string) => {
    const userToSwitch = users.find((user) => user.id === id);
    if (userToSwitch) {
      dispatch(setCurrentUser(userToSwitch.id));
    }
  };

  if (!currentUser) return <div>User not found</div>;

  return (
    <div className="user-page d-flex flex-column align-c">
      <ThemeToggle />

      <div className="user-page-avatar relative d-flex justify-c">
        {
          currentUser.isPremium && (
            <img
              className="user-page-premium absolute"
              src={premiumCheckMark}
              alt="tg-premium"
            />
          )
        }
        <UserAvatar img={currentUser?.avatar} />

        {
          (currentUser.role === 'godmode' || currentUser.role === 'editor') && (
            <UserRoleMark
              className="user-page-role absolute"
              role={currentUser.role}
            />
          )
        }
      </div>
      <div className="user-page-header d-flex flex-column align-c">
        {
          currentUser.achievements.length >= 1 && (
            <div
              style={{right: `-${currentUser?.achievements.length * 1.5 + .5}rem`}}
              className="user-page-achivs d-flex justify-c"
            >
              {
                currentUser.achievements.map((achievement) => (
                  <img
                    className="user-page-achiv"
                    src={achievementAlias[achievement as AchievementKey]}
                    alt="tg-premium"
                    key={achievement}
                  />
                ))
              }
            </div>
          )
        }
        <Title
          text={currentUser.name}
          size="l"
        />
        <div>username: {currentUser.userName || '-netu-'}</div>
        <div>id: {currentUser.id}</div>
      </div>
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
                <UserAvatar variant="mini" img={user?.avatar} />
                {user.name}
              </div>
              <UserRoleMark role={user.role} />
            </div>
          ))
        }

      </div>
    </div>
  );
}
